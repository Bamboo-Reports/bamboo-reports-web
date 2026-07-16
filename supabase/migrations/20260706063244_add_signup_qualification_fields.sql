alter table public.user_profiles
  add column if not exists job_title text,
  add column if not exists company_offering text,
  add column if not exists primary_goal text,
  add column if not exists primary_goal_other text;

comment on column public.user_profiles.job_title is
  'The user''s role or job title at their company.';
comment on column public.user_profiles.company_offering is
  'A short description of what the company offers and who it serves.';
comment on column public.user_profiles.primary_goal is
  'The primary outcome the user wants from Bamboo Reports.';
comment on column public.user_profiles.primary_goal_other is
  'Free-text goal supplied when the user selects Something else.';

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.user_profiles (
    id,
    email,
    first_name,
    last_name,
    full_name,
    phone,
    company_name,
    job_title,
    company_offering,
    primary_goal,
    primary_goal_other,
    role
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone_number',
    new.raw_user_meta_data ->> 'company_name',
    new.raw_user_meta_data ->> 'job_title',
    new.raw_user_meta_data ->> 'company_offering',
    new.raw_user_meta_data ->> 'primary_goal',
    new.raw_user_meta_data ->> 'primary_goal_other',
    'user'
  )
  on conflict (id) do update set
    email = coalesce(excluded.email, public.user_profiles.email),
    first_name = coalesce(excluded.first_name, public.user_profiles.first_name),
    last_name = coalesce(excluded.last_name, public.user_profiles.last_name),
    full_name = coalesce(excluded.full_name, public.user_profiles.full_name),
    phone = coalesce(excluded.phone, public.user_profiles.phone),
    company_name = coalesce(excluded.company_name, public.user_profiles.company_name),
    job_title = coalesce(excluded.job_title, public.user_profiles.job_title),
    company_offering = coalesce(excluded.company_offering, public.user_profiles.company_offering),
    primary_goal = coalesce(excluded.primary_goal, public.user_profiles.primary_goal),
    primary_goal_other = coalesce(excluded.primary_goal_other, public.user_profiles.primary_goal_other);

  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

update public.user_profiles as profile
set
  job_title = coalesce(profile.job_title, auth_user.raw_user_meta_data ->> 'job_title'),
  company_offering = coalesce(profile.company_offering, auth_user.raw_user_meta_data ->> 'company_offering'),
  primary_goal = coalesce(profile.primary_goal, auth_user.raw_user_meta_data ->> 'primary_goal'),
  primary_goal_other = coalesce(profile.primary_goal_other, auth_user.raw_user_meta_data ->> 'primary_goal_other')
from auth.users as auth_user
where profile.id = auth_user.id;
