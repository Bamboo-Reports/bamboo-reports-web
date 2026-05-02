-- Grant admin role to a specific user.
-- Run this in the Supabase SQL editor after the user has signed up.

update public.user_profiles
set role = 'admin'
where email = 'abhishekf@researchnxt.com';

-- Verify
select id, email, role
from public.user_profiles
where email = 'abhishekf@researchnxt.com';
