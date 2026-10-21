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

-- 5. (Optional) Grant the service-role table permissions explicitly.
--    Identity sequence names can vary when the table already exists, so
--    sequence permissions are intentionally omitted here.
grant all on public.admission_enquiries to service_role;

-- ============================================================
-- Verification — run after the above to confirm the table exists
-- ============================================================
-- select column_name, data_type, is_nullable
-- from information_schema.columns
-- where table_schema = 'public'
--   and table_name   = 'admission_enquiries'
-- order by ordinal_position;

-- ============================================================
-- CMS content, media, courses and videos
-- ============================================================

create table if not exists public.website_sections (
  id                  uuid primary key default gen_random_uuid(),
  page_key            text not null,
  section_key         text not null,
  title               text,
  subtitle            text,
  body                text,
  button_label        text,
  button_url          text,
  image_url            text,
  image_alt           text,
  seo_title           text,
  seo_description     text,
  status              text not null default 'draft' check (status in ('draft', 'published')),
  display_order       integer not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (page_key, section_key)
);

create table if not exists public.media_assets (
  id                  uuid primary key default gen_random_uuid(),
  storage_path        text not null unique,
  public_url          text not null,
  file_name           text not null,
  mime_type           text not null,
  size_bytes          integer not null,
  alt_text            text,
  caption             text,
  display_order       integer not null default 0,
  created_at          timestamptz not null default now()
);

create table if not exists public.courses (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  title               text not null,
  short_description   text not null default '',
  detailed_description text not null default '',
  category            text not null default 'academic',
  image_url            text,
  image_alt           text,
  highlights          text[] not null default '{}',
  duration            text,
  button_label        text not null default 'Enquire Now',
  button_url          text not null default '#contact',
  status              text not null default 'draft' check (status in ('draft', 'published')),
  display_order       integer not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table if not exists public.website_videos (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null,
  description         text not null default '',
  provider            text not null check (provider in ('youtube', 'vimeo')),
  video_url           text not null,
  embed_url           text not null,
  thumbnail_url       text,
  status              text not null default 'draft' check (status in ('draft', 'published')),
  display_order       integer not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table if not exists public.testimonials (
  id                  uuid primary key default gen_random_uuid(),
  reviewer_name       text not null,
  review_text         text not null,
  rating              integer not null default 5 check (rating between 1 and 5),
  course_label        text,
  google_url          text not null default 'https://maps.app.goo.gl/3FeizTNvzi8PYoSr9',
  status              text not null default 'draft' check (status in ('draft', 'published')),
  display_order       integer not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists idx_website_sections_published
  on public.website_sections (page_key, status, display_order);
create index if not exists idx_courses_published
  on public.courses (status, display_order);
create index if not exists idx_website_videos_published
  on public.website_videos (status, display_order);
create index if not exists idx_testimonials_published
  on public.testimonials (status, display_order);

drop trigger if exists set_updated_at_website_sections on public.website_sections;
create trigger set_updated_at_website_sections before update on public.website_sections
  for each row execute function public.set_updated_at();
drop trigger if exists set_updated_at_courses on public.courses;
create trigger set_updated_at_courses before update on public.courses
  for each row execute function public.set_updated_at();
drop trigger if exists set_updated_at_website_videos on public.website_videos;
create trigger set_updated_at_website_videos before update on public.website_videos
  for each row execute function public.set_updated_at();
drop trigger if exists set_updated_at_testimonials on public.testimonials;
create trigger set_updated_at_testimonials before update on public.testimonials
  for each row execute function public.set_updated_at();

alter table public.website_sections enable row level security;
alter table public.media_assets enable row level security;
alter table public.courses enable row level security;
alter table public.website_videos enable row level security;
alter table public.testimonials enable row level security;

drop policy if exists "Public can read published sections" on public.website_sections;
create policy "Public can read published sections" on public.website_sections
  for select using (status = 'published');
drop policy if exists "Public can read media metadata" on public.media_assets;
create policy "Public can read media metadata" on public.media_assets
  for select using (true);
drop policy if exists "Public can read published courses" on public.courses;
create policy "Public can read published courses" on public.courses
  for select using (status = 'published');
drop policy if exists "Public can read published videos" on public.website_videos;
create policy "Public can read published videos" on public.website_videos
  for select using (status = 'published');
drop policy if exists "Public can read published testimonials" on public.testimonials;
create policy "Public can read published testimonials" on public.testimonials
  for select using (status = 'published');

grant select on public.website_sections, public.media_assets, public.courses, public.website_videos, public.testimonials to anon, authenticated;
grant all on public.website_sections, public.media_assets, public.courses, public.website_videos, public.testimonials to service_role;

insert into storage.buckets (id, name, public)
values ('website-media', 'website-media', true)
on conflict (id) do nothing;
