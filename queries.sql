-- =============================================================================
-- Bamboo Reports auth database setup
-- =============================================================================
-- Run this in the Supabase SQL editor. It is safe to rerun.
--
-- Covers:
--   1. public.user_profiles table
--   2. RLS policies for profile self-access
--   3. auth.users trigger to mirror signup metadata
--   4. profile-images storage bucket and owner-scoped avatar policies
--   5. backfill for existing users
-- =============================================================================

-- -----------------------------------------------------------------------------
-- STEP 1 - User profile table
-- -----------------------------------------------------------------------------
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  first_name text,
  last_name text,
  full_name text,
  phone text,
  company_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_profiles
  add column if not exists email text,
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists full_name text,
  add column if not exists phone text,
  add column if not exists company_name text,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

alter table public.user_profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.user_profiles;
create policy "Users can view their own profile"
  on public.user_profiles
  for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.user_profiles;
create policy "Users can insert their own profile"
  on public.user_profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.user_profiles;
create policy "Users can update their own profile"
  on public.user_profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- -----------------------------------------------------------------------------
-- STEP 2 - updated_at maintenance
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_user_profiles_updated_at on public.user_profiles;
create trigger set_user_profiles_updated_at
  before update on public.user_profiles
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- STEP 3 - Mirror Supabase auth metadata into public.user_profiles on signup
-- -----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_profiles (id, email, first_name, last_name, full_name, phone, company_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone_number',
    new.raw_user_meta_data ->> 'company_name'
  )
  on conflict (id) do update set
    email = coalesce(excluded.email, public.user_profiles.email),
    first_name = coalesce(excluded.first_name, public.user_profiles.first_name),
    last_name = coalesce(excluded.last_name, public.user_profiles.last_name),
    full_name = coalesce(excluded.full_name, public.user_profiles.full_name),
    phone = coalesce(excluded.phone, public.user_profiles.phone),
    company_name = coalesce(excluded.company_name, public.user_profiles.company_name);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- -----------------------------------------------------------------------------
-- STEP 4 - Backfill existing users
-- -----------------------------------------------------------------------------
insert into public.user_profiles (id, email, first_name, last_name, full_name, phone, company_name)
select
  u.id,
  u.email,
  u.raw_user_meta_data ->> 'first_name',
  u.raw_user_meta_data ->> 'last_name',
  u.raw_user_meta_data ->> 'full_name',
  u.raw_user_meta_data ->> 'phone_number',
  u.raw_user_meta_data ->> 'company_name'
from auth.users u
on conflict (id) do update set
  email = coalesce(public.user_profiles.email, excluded.email),
  first_name = coalesce(public.user_profiles.first_name, excluded.first_name),
  last_name = coalesce(public.user_profiles.last_name, excluded.last_name),
  full_name = coalesce(public.user_profiles.full_name, excluded.full_name),
  phone = coalesce(public.user_profiles.phone, excluded.phone),
  company_name = coalesce(public.user_profiles.company_name, excluded.company_name);

-- -----------------------------------------------------------------------------
-- STEP 5 - Public avatar bucket with owner-scoped writes/deletes
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('profile-images', 'profile-images', true)
on conflict (id) do update set public = excluded.public;

-- Remove older broad policies from previous setup docs before adding scoped ones.
drop policy if exists "Allow authenticated users to upload" on storage.objects;
drop policy if exists "Public read access" on storage.objects;
drop policy if exists "Allow users to delete their own images" on storage.objects;

drop policy if exists "Public read access for profile images" on storage.objects;
create policy "Public read access for profile images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'profile-images');

drop policy if exists "Users can upload their own profile images" on storage.objects;
create policy "Users can upload their own profile images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'profile-images'
    and (storage.foldername(name))[1] = 'avatars'
    and name like ('avatars/' || auth.uid()::text || '-%')
  );

drop policy if exists "Users can update their own profile images" on storage.objects;
create policy "Users can update their own profile images"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'profile-images'
    and (storage.foldername(name))[1] = 'avatars'
    and name like ('avatars/' || auth.uid()::text || '-%')
  )
  with check (
    bucket_id = 'profile-images'
    and (storage.foldername(name))[1] = 'avatars'
    and name like ('avatars/' || auth.uid()::text || '-%')
  );

drop policy if exists "Users can delete their own profile images" on storage.objects;
create policy "Users can delete their own profile images"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'profile-images'
    and (storage.foldername(name))[1] = 'avatars'
    and name like ('avatars/' || auth.uid()::text || '-%')
  );

-- -----------------------------------------------------------------------------
-- STEP 6 - Event log table for admin command center
-- -----------------------------------------------------------------------------
create table if not exists public.event_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text,
  event_type text not null,
  report_slug text,
  metadata jsonb not null default '{}'::jsonb,
  user_agent text,
  ip text,
  referrer text,
  created_at timestamptz not null default now()
);

create index if not exists event_logs_user_id_idx on public.event_logs (user_id);
create index if not exists event_logs_event_type_idx on public.event_logs (event_type);
create index if not exists event_logs_created_at_idx on public.event_logs (created_at desc);

alter table public.event_logs enable row level security;

-- Anyone (anon or authenticated) can insert events. Useful for signup events
-- that fire before the user has a session.
drop policy if exists "Anyone can insert event logs" on public.event_logs;
create policy "Anyone can insert event logs"
  on public.event_logs
  for insert
  to anon, authenticated
  with check (true);

-- TEMPORARY: any authenticated user can read all events so the hardcoded
-- /admin page can render. Replace with a role/claim check before this hits
-- real users.
drop policy if exists "Authenticated users can read event logs" on public.event_logs;
create policy "Authenticated users can read event logs"
  on public.event_logs
  for select
  to authenticated
  using (true);

-- TEMPORARY: same loosening for user_profiles so /admin can list every user.
drop policy if exists "Authenticated users can read all profiles" on public.user_profiles;
create policy "Authenticated users can read all profiles"
  on public.user_profiles
  for select
  to authenticated
  using (true);

-- -----------------------------------------------------------------------------
-- STEP 7 - Verify after a test signup
-- -----------------------------------------------------------------------------
select email, raw_user_meta_data
from auth.users
order by created_at desc
limit 5;

select id, email, first_name, last_name, full_name, phone, company_name, created_at, updated_at
from public.user_profiles
order by created_at desc nulls last
limit 5;
