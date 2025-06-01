create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  _name text := coalesce(new.raw_user_meta_data ->> 'name', 'Anonymous');
  _nickname text := coalesce(new.raw_user_meta_data ->> 'nickname', 'onepy.' || substr(md5(random()::text), 1, 8));
  _phone text := new.raw_user_meta_data ->> 'phone';
begin
  if new.raw_app_meta_data is not null then
    if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'email' then
      insert into public.user_onepy (user_onepy_id, name, nickname, phone)
      values (
        new.id,
        _name,
        _nickname,
        _phone
      );
      -- 한평머니 회원가입 지급 (누적)
      insert into public.onepy_money_log (user_onepy_id, action, amount, reason, total_onepy_money)
      values (
        new.id,
        '지급',
        10000,
        '회원가입',
        coalesce(
          (select total_onepy_money from public.onepy_money_log where user_onepy_id = new.id order by created_at desc limit 1),
          0
        ) + 10000
      );
    end if;
  end if;
  return new;
end;
$$;

drop function if exists public.handle_new_user() cascade;

create trigger user_to_user_onepy
after insert on auth.users
for each row execute function public.handle_new_user();