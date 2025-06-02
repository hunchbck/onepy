drop function if exists public.handle_new_user() cascade;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  _name text;
  _nickname text;
  _phone text;
  _avatar text;
begin
  if new.raw_app_meta_data is not null then
    if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'email' then
      _name := coalesce(new.raw_user_meta_data ->> 'name', 'Anonymous');
      _nickname := coalesce(new.raw_user_meta_data ->> 'nickname', 'Onepy.' || substr(md5(random()::text), 1, 8));
      _phone := new.raw_user_meta_data ->> 'phone';
      insert into public.user_onepy (
        user_onepy_id,
        name,
        nickname,
        phone
      )
      values (
        new.id,
        _name,
        _nickname,
        _phone
      );
    end if;
    if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'kakao' then
      _name := new.raw_user_meta_data ->> 'name';
      _nickname := 'Kakao' || coalesce(new.raw_user_meta_data ->> 'provider_id', substr(md5(random()::text), 1, 8));
      _phone := new.phone;
      _avatar := new.raw_user_meta_data ->> 'avatar_url';
      insert into public.user_onepy (
        user_onepy_id,
        name,
        nickname,
        phone,
        avatar
      )
      values (
        new.id,
        _name,
        _nickname,
        _phone,
        _avatar
      );
    end if;
    -- 한평머니 회원가입 10,000원 지급 (누적)
    insert into public.onepy_money_log (user_onepy_id, action, amount, reason, total_onepy_money)
    values (
      new.id,
      '지급',
      10000,
      '회원가입',
      coalesce(
        (select total_onepy_money from public.onepy_money_log order by created_at desc limit 1),
        0
      ) + 10000
    );
  end if;
  return new;
end;
$$;

create trigger user_to_user_onepy
after insert on auth.users
for each row execute function public.handle_new_user();