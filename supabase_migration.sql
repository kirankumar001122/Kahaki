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

create table if not exists public.faculty (
  id                    uuid primary key default gen_random_uuid(),
  full_name             text not null,
  photograph            text,
  designation           text not null,
  institution           text,
  qualifications        text[] not null default '{}',
  specialisations       text[] not null default '{}',
  experience_years      integer not null default 0 check (experience_years >= 0),
  professional_profile  text not null default '',
  teaching_methodology  text not null default '',
  additional_achievements text not null default '',
  status                text not null default 'draft' check (status in ('draft', 'published')),
  display_order         integer not null default 0,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

insert into public.faculty (
  full_name, photograph, designation, institution, qualifications, specialisations,
  experience_years, professional_profile, teaching_methodology, additional_achievements,
  status, display_order
)
select
  'MUBARAK M. A.', '/images/teachers/mubarak-ma.jpg',
  'Senior Hindi & Social Science Faculty | SSLC Specialist',
  'KHAKI ACADEMY — ACADEMY OF EXCELLENCE',
  array['M.A.', 'D.Ed.', 'B.Ed.'],
  array['Hindi: 10th Grade (SSLC) specialist.', 'Social Science: School-level instruction.'],
  15,
  'Mubarak M. A. is an experienced educator with 15 years of teaching experience, specialising in 10th-grade Hindi and Social Science. He focuses on strengthening students’ Hindi grammar, comprehension, writing skills, and examination preparation while helping them understand key concepts in history, geography, civics, and economics.',
  'His teaching approach emphasises syllabus-based instruction, conceptual clarity, systematic revision, and question-paper practice to help students build confidence and prepare effectively for their SSLC examinations.',
  '',
  'published', 0
where not exists (select 1 from public.faculty where full_name = 'MUBARAK M. A.');

insert into public.faculty (
  full_name, photograph, designation, institution, qualifications, specialisations,
  experience_years, professional_profile, teaching_methodology, additional_achievements,
  status, display_order
)
select
  'VASANTH KUMAR N. G.', '/images/teachers/VASANTH KUMAR N. G.PNG',
  'Senior Mathematics Faculty | Academic Guide & Trainer',
  'KHAKI ACADEMY — ACADEMY OF EXCELLENCE',
  array['M.Sc.', 'B.Ed.', 'TET Qualified'],
  array['Mathematics: 10th Grade, 1st PUC and 2nd PUC.', 'Computer Training.', 'Soft Skills Training.', 'Academic Guidance and Student Mentoring.'],
  10,
  'Vasanth Kumar N. G. is an experienced mathematics educator and academic guide with 10 years of teaching experience. He specialises in mathematics for SSLC, 1st PUC and 2nd PUC students, focusing on conceptual clarity, logical reasoning, problem-solving techniques and examination preparation.',
  'In addition to mathematics education, he provides computer training and soft skills development to help learners strengthen their academic and professional competencies. As an academic guide, he supports students in developing effective learning strategies, confidence and a strong foundation for future success.',
  'At KHAKI ACADEMY, he is committed to delivering quality education through structured teaching, individual guidance and student-centred learning.',
  'published', 1
where not exists (select 1 from public.faculty where full_name = 'VASANTH KUMAR N. G.');

insert into public.faculty (
  full_name, photograph, designation, institution, qualifications, specialisations,
  experience_years, professional_profile, teaching_methodology, additional_achievements,
  status, display_order
)
select
  'NAVEEN KUMAR Y.', '/images/teachers/NAVEEN KUMAR Y.PNG',
  'Senior Faculty – Physics & Mathematics',
  'KHAKI ACADEMY — ACADEMY OF EXCELLENCE',
  array['B.E. – Bachelor of Engineering.', 'M.Tech – Master of Technology.', 'Ph.D. – Currently Pursuing.'],
  array['Physics.', 'Mathematics.'],
  5,
  'Naveen Kumar Y is an experienced educator specialising in Physics and Mathematics. With five years of teaching experience, he focuses on conceptual clarity, analytical thinking, problem-solving techniques, and the practical application of scientific and mathematical principles.',
  'His teaching approach emphasises structured learning, logical reasoning, and a clear understanding of fundamental concepts.',
  'State Second Topper in M.Tech. At KHAKI ACADEMY, he is committed to delivering effective, student-focused education that strengthens subject knowledge, develops problem-solving skills, and prepares learners to achieve academic excellence.',
  'published', 2
where not exists (select 1 from public.faculty where full_name = 'NAVEEN KUMAR Y.');

insert into public.faculty (
  full_name, photograph, designation, institution, qualifications, specialisations,
  experience_years, professional_profile, teaching_methodology, additional_achievements,
  status, display_order
)
select
  'ARUN S. A.', '/images/teachers/ARUN S A.PNG',
  'Senior Physics Faculty | PUC Physics Specialist',
  'KHAKI ACADEMY — ACADEMY OF EXCELLENCE',
  array['M.Sc. in Physics.', 'B.Ed.', 'TET Qualified.', 'KSET Qualified.', 'Ph.D. – Currently Pursuing.'],
  array['Physics.', 'First PUC.', 'Second PUC.'],
  8,
  'Arun S. A. is an experienced Physics educator specialising in First PUC and Second PUC Physics. With eight years of teaching experience, he focuses on strengthening fundamental concepts, developing analytical and problem-solving skills, and simplifying complex physical principles through structured and systematic instruction.',
  'With a strong academic background in Physics, along with B.Ed. qualification, TET and KSET credentials, he is committed to maintaining high teaching standards and supporting students in their academic development.',
  'At KHAKI ACADEMY, he strives to deliver concept-oriented, student-focused Physics education, helping learners develop scientific reasoning, improve examination performance, and build confidence in the subject.',
  'published', 3
where not exists (select 1 from public.faculty where full_name = 'ARUN S. A.');

insert into public.faculty (
  full_name, photograph, designation, institution, qualifications, specialisations,
  experience_years, professional_profile, teaching_methodology, additional_achievements,
  status, display_order
)
select
  'MANJUNATHA T.', '/images/teachers/MANJUNATHA T.PNG',
  'Senior Faculty | Social Science & Kannada Specialist',
  'KHAKI ACADEMY — ACADEMY OF EXCELLENCE',
  array['M.A.', 'B.Ed.', 'TET Qualified'],
  array['Social Science.', 'Kannada.'],
  6,
  'Manjunatha T. is an experienced educator specialising in Social Science and Kannada, with six years of teaching experience. He is committed to helping students develop a strong understanding of subject concepts, improve language proficiency, and achieve academic excellence through structured and systematic instruction.',
  'With a postgraduate qualification (M.A.), a Bachelor of Education (B.Ed.), and TET qualification, he brings a strong academic foundation and a student-focused approach to teaching. His teaching methodology emphasises conceptual clarity, effective communication, curriculum-oriented instruction, and the development of critical thinking skills.',
  'At KHAKI ACADEMY, he strives to deliver engaging and effective Social Science and Kannada education, helping learners strengthen their subject knowledge, improve examination performance, and build confidence in their academic journey.',
  'published', 4
where not exists (select 1 from public.faculty where full_name = 'MANJUNATHA T.');

-- Additional published faculty and administrative profiles requested by the public site.
insert into public.faculty (
  full_name, photograph, designation, institution, qualifications, specialisations,
  experience_years, professional_profile, teaching_methodology, additional_achievements,
  status, display_order
)
select
  'GANESH', '/images/teachers/GANESH.PNG',
  'PCM Faculty - Chemistry Specialist',
  'KHAKI ACADEMY - ACADEMY OF EXCELLENCE',
  array['M.Sc.', 'B.Ed.'], array['Chemistry', '2nd PUC Organic Chemistry'], 3,
  'Ganesh specialises in Chemistry with a focus on conceptual clarity and examination preparation.',
  'Structured, concept-oriented instruction with systematic problem-solving practice.', '',
  'published', 10
where not exists (select 1 from public.faculty where upper(full_name) = 'GANESH');

insert into public.faculty (
  full_name, photograph, designation, institution, qualifications, specialisations,
  experience_years, professional_profile, teaching_methodology, additional_achievements,
  status, display_order
)
select
  'SRIKANTH P', '/images/teachers/SHRIKANTH P.PNG',
  'PCM Faculty - Chemistry Specialist',
  'KHAKI ACADEMY - ACADEMY OF EXCELLENCE',
  array['M.Sc. in Organic Chemistry', 'B.Ed.', 'KSET Qualified'],
  array['Chemistry', 'Organic Chemistry', 'PUC Chemistry'], 6,
  'Srikanth P is an experienced Chemistry educator specialising in Organic Chemistry.',
  'Structured teaching, subject expertise and student-focused examination preparation.', '',
  'published', 11
where not exists (select 1 from public.faculty where upper(full_name) = 'SRIKANTH P');

insert into public.faculty (
  full_name, photograph, designation, institution, qualifications, specialisations,
  experience_years, professional_profile, teaching_methodology, additional_achievements,
  status, display_order
)
select
  'ARUNA G', '/images/teachers/ARUNA G.PNG',
  'Administration - Computer & Spoken English Trainer',
  'KHAKI ACADEMY - ACADEMY OF EXCELLENCE',
  array['Bachelor of Commerce (B.Com.)'],
  array['Administration', 'Business Studies - 2nd PUC', 'Computer Education', 'Spoken English Training'], 4,
  'Aruna G supports administration and helps learners develop practical computer skills and effective English communication.',
  'Practical learning, clear instruction and confidence building.', '',
  'published', 12
where not exists (select 1 from public.faculty where upper(full_name) = 'ARUNA G');

insert into public.faculty (
  full_name, photograph, designation, institution, qualifications, specialisations,
  experience_years, professional_profile, teaching_methodology, additional_achievements,
  status, display_order
)
select
  'ANIL', '/images/teachers/ANIL V.PNG',
  'Finance Department',
  'KHAKI ACADEMY - ACADEMY OF EXCELLENCE',
  array[]::text[], array['Finance Department'], 5,
  'Anil supports the Finance Department with 5 years of experience.',
  'Professional and organised administrative support.', '',
  'published', 13
where not exists (select 1 from public.faculty where upper(full_name) in ('ANIL', 'ANIL V'));

insert into public.courses (
  slug, title, short_description, detailed_description, category, image_url, image_alt,
  highlights, duration, button_label, button_url, status, display_order
)
select
  'professional-spoken-english-online',
  'Professional Spoken English — Online',
  'Develop confident English communication skills through structured online training, practical speaking activities, pronunciation improvement, grammar development and real-world communication practice.',
  'Online Professional Spoken English training covering fluency, accent, pronunciation, grammar, professional communication, interviews, public speaking and practical conversation sessions.',
  'Language & Communication',
  '/images/professional-spoken-english.png',
  'Professional Spoken English online course',
  array[
    'English speaking and fluency development',
    'Accent training and pronunciation',
    'English grammar and sentence formation',
    'Professional communication',
    'Interview preparation',
    'Public speaking and presentation skills',
    'Practical conversation sessions'
  ],
  'Online', 'Enquire Now', '#contact', 'published', 20
where not exists (select 1 from public.courses where slug = 'professional-spoken-english-online');

-- Restore the original public course catalogue in CMS without replacing existing rows.
insert into public.courses (
  slug, title, short_description, category, image_url, image_alt, highlights,
  duration, button_label, button_url, status, display_order
)
select
  'professional-spoken-english',
  'Professional Spoken English',
  'Absolute Beginner to Advanced levels. American & British Accents. Fluent & Grammatically Correct.',
  'English', '/images/professional-spoken-english.png', 'Professional Spoken English course',
  array[
    'Speaking and conversation practice',
    'Grammar and vocabulary development',
    'Pronunciation and confidence building',
    'Interview preparation and communication skills',
    'Public speaking and presentation skills'
  ],
  null, 'Enquire Now', '#contact', 'published', 0
where not exists (select 1 from public.courses where slug = 'professional-spoken-english');

insert into public.courses (
  slug, title, short_description, category, image_url, image_alt, highlights,
  duration, button_label, button_url, status, display_order
)
select
  'computer-training',
  'Computer Training',
  'Practical computer skills training covering MS Office, Excel, Tally with GST, Python programming, Power BI, and AI basics for students and working professionals.',
  'Computer', '/images/computer-training-lab.png', 'Computer training laboratory',
  array['MS Office | Tally | GST', 'Python | Power BI | Typing', 'Practical & Career-Focused'],
  'Digital Skills', 'Enquire Now', '#contact', 'published', 1
where not exists (select 1 from public.courses where slug = 'computer-training');

insert into public.courses (
  slug, title, short_description, category, image_url, image_alt, highlights,
  duration, button_label, button_url, status, display_order
)
select
  'school-tuition',
  'School Tuition',
  'Subject-wise coaching for Karnataka State Board, CBSE, ICSE and other board students from Classes 1 to 10, with homework support, chapter-wise assessments, and regular practice.',
  'School', '/images/up.png', 'Students learning at Khaki Academy',
  array['State | CBSE | ICSE', 'All Subjects', 'Regular Tests & Support'],
  'Classes 1-10', 'Enquire Now', '#contact', 'published', 2
where not exists (select 1 from public.courses where slug = 'school-tuition');

insert into public.courses (
  slug, title, short_description, category, image_url, image_alt, highlights,
  duration, button_label, button_url, status, display_order
)
select
  '1st-2nd-puc',
  '1st & 2nd PUC',
  'In-depth chapter-wise coaching for 1st and 2nd PUC Science (PCMB) and Commerce (Accountancy, Business Studies, Economics) with board exam preparation and mock tests.',
  'PUC', '/images/kak.png', 'PUC academic programme',
  array['PCMB | PCMC | Commerce', 'Chapter-wise Teaching', 'Exam Preparation'],
  'Science & Commerce', 'Enquire Now', '#contact', 'published', 3
where not exists (select 1 from public.courses where slug = '1st-2nd-puc');

insert into public.courses (
  slug, title, short_description, category, image_url, image_alt, highlights,
  duration, button_label, button_url, status, display_order
)
select
  'cet-neet-jee-foundation',
  'CET, NEET & JEE Foundation',
  'Concept-focused foundation preparation for CET, NEET and JEE. Suitable from Classes 8-10 onwards, with weekend classes, practice sessions, and regular revision.',
  'Foundation', '/images/CET.PNG', 'CET, NEET and JEE Foundation course',
  array['Classes 8 - 10', 'Concept Building', 'Practice Tests & Expert Guidance'],
  'Competitive Exam Prep', 'Enquire Now', '#contact', 'published', 4
where not exists (select 1 from public.courses where slug = 'cet-neet-jee-foundation');

update public.courses
set image_url = '/images/CET.PNG', image_alt = 'CET, NEET and JEE Foundation course'
where lower(title) like '%cet%' and lower(title) like '%jee%';

update public.faculty
set designation = 'Admin & Senior Faculty',
    specialisations = array['Administration and Academics', 'Mathematics: 10th Grade, 1st PUC and 2nd PUC.', 'Computer Training.', 'Soft Skills Training.', 'Academic Guidance and Student Mentoring.'],
    display_order = 1
where upper(full_name) = 'VASANTH KUMAR N. G.';

update public.faculty
set designation = 'Administrator',
    specialisations = array['Administration', 'Business Studies - 2nd PUC', 'Computer Education', 'Spoken English Training'],
    display_order = 2
where upper(full_name) = 'ARUNA G';

update public.faculty
set designation = 'Science Faculty - PCM',
    specialisations = array['Department: Science', 'Physics, Chemistry and Mathematics (PCM)', 'Physics', 'First PUC', 'Second PUC'],
    display_order = 3
where upper(full_name) = 'ARUN S. A.';

update public.faculty
set designation = 'Science Faculty - PCM',
    specialisations = array['Department: Science', 'Physics, Chemistry and Mathematics (PCM)', 'Organic Chemistry', 'PUC Chemistry'],
    display_order = 4
where upper(full_name) = 'SRIKANTH P';

insert into public.faculty (
  full_name, photograph, designation, institution, qualifications, specialisations,
  experience_years, professional_profile, teaching_methodology, additional_achievements,
  status, display_order
)
select
  'VASANTH', '', 'Science Faculty - PCM',
  'KHAKI ACADEMY - ACADEMY OF EXCELLENCE',
  array[]::text[],
  array['Department: Science', 'Physics, Chemistry and Mathematics (PCM)'],
  0,
  'Profile information is being updated through the Khaki Academy administration team.',
  'Profile information is being updated through the Khaki Academy administration team.',
  '', 'published', 5
where not exists (select 1 from public.faculty where upper(full_name) = 'VASANTH');

update public.faculty
set designation = 'Science Faculty - PCM',
    specialisations = array['Department: Science', 'Physics, Chemistry and Mathematics (PCM)', 'Organic Chemistry'],
    display_order = 6
where upper(full_name) = 'GANESH';

update public.faculty
set experience_years = 5
where upper(full_name) = 'NIKHATH AYESHA';

update public.faculty
set designation = 'Finance Department', experience_years = 5,
    specialisations = array['Department: Finance', 'Finance Department'],
    display_order = 7
where upper(full_name) in ('ANIL', 'ANIL V');

create index if not exists idx_website_sections_published
  on public.website_sections (page_key, status, display_order);
create index if not exists idx_courses_published
  on public.courses (status, display_order);
create index if not exists idx_website_videos_published
  on public.website_videos (status, display_order);
create index if not exists idx_testimonials_published
  on public.testimonials (status, display_order);
create index if not exists idx_faculty_published
  on public.faculty (status, display_order);

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
drop trigger if exists set_updated_at_faculty on public.faculty;
create trigger set_updated_at_faculty before update on public.faculty
  for each row execute function public.set_updated_at();

alter table public.website_sections enable row level security;
alter table public.media_assets enable row level security;
alter table public.courses enable row level security;
alter table public.website_videos enable row level security;
alter table public.testimonials enable row level security;
alter table public.faculty enable row level security;

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
drop policy if exists "Public can read published faculty" on public.faculty;
create policy "Public can read published faculty" on public.faculty
  for select using (status = 'published');

grant select on public.website_sections, public.media_assets, public.courses, public.website_videos, public.testimonials, public.faculty to anon, authenticated;
grant all on public.website_sections, public.media_assets, public.courses, public.website_videos, public.testimonials, public.faculty to service_role;

insert into storage.buckets (id, name, public)
values ('website-media', 'website-media', true)
on conflict (id) do nothing;
