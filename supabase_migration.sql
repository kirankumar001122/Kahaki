-- ============================================================
-- Khaki Academy — Supabase Migration
-- Table: public.admission_enquiries
-- Run this once in the Supabase SQL Editor
-- (Dashboard → SQL Editor → New Query → paste → Run)
-- ============================================================

-- 1. Create the table
create table if not exists public.admission_enquiries (
  id                 bigint generated always as identity primary key,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),

  -- Student details
  student_name       text        not null,
  mobile_number      text        not null,
  email              text,

  -- Course preferences
  course             text,
  learning_mode      text,           -- 'offline' | 'online' | 'either'
  english_level      text,           -- Only relevant for Spoken English

  -- Additional info
  message            text,
  consent_to_contact boolean     not null default false,

  -- Internal workflow
  status             text        not null default 'new'
                       check (status in ('new', 'contacted', 'enrolled', 'closed'))
);

-- 2. Auto-update updated_at on every row change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at_admission_enquiries
  on public.admission_enquiries;

create trigger set_updated_at_admission_enquiries
  before update on public.admission_enquiries
  for each row execute function public.set_updated_at();

-- 3. Helpful index — speeds up the duplicate-submission check in server.js
create index if not exists idx_admission_enquiries_mobile_created
  on public.admission_enquiries (mobile_number, created_at desc);

-- 4. Row Level Security
--    The service-role key (used only in server.js) bypasses RLS automatically.
--    Deny all direct client access so the anon/public key cannot read or
--    write this table even if someone inspects the client bundle.
alter table public.admission_enquiries enable row level security;

-- No RLS policies added → all operations via anon/authenticated keys are denied.
-- Only the service-role key (server.js) can read/write this table.

-- 5. (Optional) Grant the service-role all permissions explicitly
--    This is usually automatic, but included for clarity.
grant all on public.admission_enquiries to service_role;
grant usage, select on sequence public.admission_enquiries_id_seq to service_role;

-- ============================================================
-- Verification — run after the above to confirm the table exists
-- ============================================================
-- select column_name, data_type, is_nullable
-- from information_schema.columns
-- where table_schema = 'public'
--   and table_name   = 'admission_enquiries'
-- order by ordinal_position;
