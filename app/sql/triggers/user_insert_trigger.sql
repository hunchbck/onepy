DROP TRIGGER IF EXISTS user_insert_trigger ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  _name text;
  _nickname text;
  _phone text;
  _avatar text;
  _charge_price int := 10000;
BEGIN
  IF new.raw_app_meta_data IS NOT NULL THEN
    IF new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'email' THEN
      _name := coalesce(new.raw_user_meta_data ->> 'name', 'Anonymous');
      _nickname := coalesce(new.raw_user_meta_data ->> 'nickname', 'Onepy.' || substr(md5(random()::text), 1, 8));
      _phone := new.raw_user_meta_data ->> 'phone';
      INSERT INTO public.user_onepy (
        user_onepy_id,
        name,
        nickname,
        phone
      )
      VALUES (
        new.id,
        _name,
        _nickname,
        _phone
      );
    END IF;
    IF new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'kakao' THEN
      _name := new.raw_user_meta_data ->> 'name';
      _nickname := 'Kakao' || coalesce(new.raw_user_meta_data ->> 'provider_id', substr(md5(random()::text), 1, 8));
      _phone := new.phone;
      _avatar := new.raw_user_meta_data ->> 'avatar_url';
      INSERT INTO public.user_onepy (
        user_onepy_id,
        name,
        nickname,
        phone,
        avatar
      )
      VALUES (
        new.id,
        _name,
        _nickname,
        _phone,
        _avatar
      );
    END IF;

    INSERT INTO public.onepy_money_log (
      user_onepy_id,
      price,
      meta
    )
    SELECT
      new.id,
      _charge_price,
      jsonb_build_object(
        'reason', '가입축하금 ' || to_char(_charge_price, 'FM999,999,999,999') || '원 드려요~',
        'reason_id', jsonb_build_object('onepy_charge_id', 2),
        'total_onepy_money', jsonb_build_object(
          'charge', COALESCE(last_charge, 0) + _charge_price,
          'use', COALESCE(last_use, 0),
          'total', (COALESCE(last_charge, 0) + _charge_price) - COALESCE(last_use, 0)
        )
      )
    FROM (
      -- 마지막 로그의 누적값 읽기
      SELECT
        (meta->'total_onepy_money'->>'charge')::int AS last_charge,
        (meta->'total_onepy_money'->>'use')::int AS last_use
      FROM public.onepy_money_log
      ORDER BY created_at DESC
      LIMIT 1
    ) AS sub
    -- 만약 로그가 하나도 없을 때도 INSERT 되도록 LEFT JOIN 형태로 처리
    RIGHT JOIN (SELECT 1) dummy ON TRUE;
  END IF;
  RETURN new;
END;
$$;

CREATE TRIGGER user_insert_trigger
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
