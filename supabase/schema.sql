create extension if not exists "pgcrypto";

create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  host_name text,
  category text,
  status text not null default 'collecting',
  draft_payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invite_links (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  token_hash text,
  token_plain_for_local_mvp_only text,
  access_mode text not null default 'link_anyone',
  is_closed boolean not null default false,
  expires_at timestamptz,
  max_responses integer,
  duplicate_guard_mode text not null default 'none',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.meeting_responses (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  invite_token_hash text,
  invite_token_plain_for_local_mvp_only text,
  guest_name text,
  attendance text not null,
  date_votes jsonb not null default '[]'::jsonb,
  place_suggestions jsonb not null default '[]'::jsonb,
  activity_preferences jsonb not null default '[]'::jsonb,
  message text,
  idempotency_key text not null,
  source text not null default 'guest_web',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (meeting_id, idempotency_key)
);

create table if not exists public.confirmed_plans (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null unique references public.meetings(id) on delete cascade,
  date_label text,
  time_label text,
  place_name text,
  activity_labels jsonb not null default '[]'::jsonb,
  confirm_source text not null,
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS will be configured with policies in Phase F-4C
alter table public.meetings enable row level security;
alter table public.invite_links enable row level security;
alter table public.meeting_responses enable row level security;
alter table public.confirmed_plans enable row level security;

-- MVP dev policies.
-- These are intentionally permissive for prototype validation.
-- Phase F-4C must replace them with token-aware policies / edge validation.

create policy "meetings_select_all_mvp"
on public.meetings
for select
using (true);

create policy "meetings_insert_all_mvp"
on public.meetings
for insert
with check (true);

create policy "invite_links_select_all_mvp"
on public.invite_links
for select
using (true);

create policy "invite_links_insert_all_mvp"
on public.invite_links
for insert
with check (true);

create policy "meeting_responses_select_all_mvp"
on public.meeting_responses
for select
using (true);

create policy "meeting_responses_insert_all_mvp"
on public.meeting_responses
for insert
with check (true);

create policy "meeting_responses_update_all_mvp"
on public.meeting_responses
for update
using (true)
with check (true);

create policy "confirmed_plans_select_all_mvp"
on public.confirmed_plans
for select
using (true);

create policy "confirmed_plans_insert_all_mvp"
on public.confirmed_plans
for insert
with check (true);

create policy "confirmed_plans_update_all_mvp"
on public.confirmed_plans
for update
using (true)
with check (true);
