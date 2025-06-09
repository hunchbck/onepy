DROP TRIGGER IF EXISTS user_delete_trigger ON auth.users;
DROP FUNCTION IF EXISTS public.handle_user_delete() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_user_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  _email text := '';
  _onepy_money int := 0;
BEGIN
  -- 1. 이메일 읽기 (auth.users 테이블에서)
  SELECT email INTO _email FROM auth.users WHERE id = old.id;

  _email := coalesce(_email, '');

  -- 2. onepy_money 읽기 (user_onepy.stats->'money'->>'onepy_money')
  SELECT COALESCE((stats->'money'->>'onepy_money')::int, 0) INTO _onepy_money
  FROM public.user_onepy
  WHERE user_onepy_id = old.id;

  _onepy_money := coalesce(_onepy_money, 0);

  -- 3. 차감 로그 insert (서브쿼리 한방)
  IF _onepy_money > 0 THEN
    INSERT INTO public.onepy_money_log (
      user_onepy_id,
      price,
      meta
    )
    SELECT
      old.id,
      -_onepy_money,
      jsonb_build_object(
        'reason', _email || ' 회원이 삭제되어 한평머니 전체금액에서 ' || to_char(_onepy_money, 'FM999,999,999,999') || '원 차감됐어요',
        'total_onepy_money', jsonb_build_object(
          'charge', COALESCE(sub.last_charge, 0),
          'use', COALESCE(sub.last_use, 0) + _onepy_money,
          'total', COALESCE(sub.last_charge, 0) - (COALESCE(sub.last_use, 0) + _onepy_money)
        )
      )
    FROM (
      SELECT
        (meta->'total_onepy_money'->>'charge')::int AS last_charge,
        (meta->'total_onepy_money'->>'use')::int AS last_use
      FROM public.onepy_money_log
      ORDER BY created_at DESC
      LIMIT 1
    ) AS sub
    RIGHT JOIN (SELECT 1) dummy ON TRUE;
  END IF;
  RETURN old;
END;
$$;

CREATE TRIGGER user_delete_trigger
BEFORE DELETE ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_user_delete();
