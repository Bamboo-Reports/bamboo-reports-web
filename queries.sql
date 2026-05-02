-- =============================================================================
-- Bamboo Reports — extend existing public.user_profiles for new signup fields
-- =============================================================================
-- Your existing table already has:
--   id uuid (PK), full_name text, phone text, created_at, updated_at
-- and RLS policies for self insert/update/select.
--
-- This script:
--   • adds company_name column
--   • adds a trigger that auto-fills user_profiles on every new signup
--   • backfills existing users from auth.users metadata
--
-- Run each STEP one at a time in the Supabase SQL editor:
--   https://supabase.com/dashboard → your project → SQL Editor → New query
-- After each step, click "Run" and confirm there were no errors before moving on.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- STEP 1 — Add the missing company_name column.
-- (full_name, phone, id, created_at, updated_at already exist on user_profiles.)
-- -----------------------------------------------------------------------------
alter table public.user_profiles
  add column if not exists company_name text;


-- -----------------------------------------------------------------------------
-- STEP 2 — Trigger that mirrors signup metadata into user_profiles.
-- Maps:
--   raw_user_meta_data.full_name     -> user_profiles.full_name
--   raw_user_meta_data.phone_number  -> user_profiles.phone
--   raw_user_meta_data.company_name  -> user_profiles.company_name
--
-- Uses INSERT ... ON CONFLICT DO UPDATE so it's safe whether or not the client
-- also inserts (your existing INSERT policy suggests it might).
-- -----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_profiles (id, full_name, phone, company_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone_number',
    new.raw_user_meta_data ->> 'company_name'
  )
  on conflict (id) do update set
    full_name    = coalesce(excluded.full_name,    public.user_profiles.full_name),
    phone        = coalesce(excluded.phone,        public.user_profiles.phone),
    company_name = coalesce(excluded.company_name, public.user_profiles.company_name),
    updated_at   = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- -----------------------------------------------------------------------------
-- STEP 3 — One-time backfill for users who already exist.
-- Pulls company_name + phone (from phone_number key) from their metadata into
-- user_profiles. Won't overwrite values that are already set.
-- -----------------------------------------------------------------------------
insert into public.user_profiles (id, full_name, phone, company_name)
select
  u.id,
  u.raw_user_meta_data ->> 'full_name',
  u.raw_user_meta_data ->> 'phone_number',
  u.raw_user_meta_data ->> 'company_name'
from auth.users u
on conflict (id) do update set
  full_name    = coalesce(public.user_profiles.full_name,    excluded.full_name),
  phone        = coalesce(public.user_profiles.phone,        excluded.phone),
  company_name = coalesce(public.user_profiles.company_name, excluded.company_name),
  updated_at   = now();


-- -----------------------------------------------------------------------------
-- STEP 4 — Verify (run AFTER a test signup at /signup).
-- -----------------------------------------------------------------------------

-- 4a. Confirm signup metadata captured on the auth user:
select email, raw_user_meta_data
from auth.users
order by created_at desc
limit 5;

-- 4b. Confirm the trigger wrote to user_profiles:
select id, full_name, phone, company_name, created_at
from public.user_profiles
order by created_at desc nulls last
limit 5;


-- =============================================================================
-- ROLLBACK — only run if you want to undo this script.
-- Drops the trigger/function and removes company_name. Existing rows + policies
-- on user_profiles are untouched.
-- =============================================================================
-- drop trigger if exists on_auth_user_created on auth.users;
-- drop function if exists public.handle_new_user();
-- alter table public.user_profiles drop column if exists company_name;
