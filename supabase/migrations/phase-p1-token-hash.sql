-- Phase P1: Add token hashing and RLS

-- Add hash columns
alter table public.invite_links add column if not exists token_hash text;
alter table public.meeting_responses add column if not exists invite_token_hash text;

-- Add indexes
create unique index if not exists invite_links_meeting_token_hash_idx on public.invite_links(meeting_id, token_hash);
create index if not exists meeting_responses_meeting_id_idx on public.meeting_responses(meeting_id);

-- RLS Comments (To be applied when removing MVP status)
/*
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invite_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.confirmed_plans ENABLE ROW LEVEL SECURITY;

-- meetings
-- anon select: invite link 검증 후 프론트 repository에서 제한 (no direct RLS for this yet since anon needs it)
-- anon insert: create meeting 허용, 단 공개 베타에서는 남용 위험 기록
CREATE POLICY "Enable insert for anonymous users" ON public.meetings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Enable select for anonymous users" ON public.meetings FOR SELECT TO anon USING (true);
CREATE POLICY "Enable update for anonymous users" ON public.meetings FOR UPDATE TO anon USING (true); -- needed for MVP confirm
CREATE POLICY "Enable delete for anonymous users" ON public.meetings FOR DELETE TO anon USING (true); -- needed for MVP orphan cleanup

-- invite_links
-- anon insert: meeting 생성 시 허용
-- anon select: meeting_id + token_hash 기준 조회 필요
CREATE POLICY "Enable insert for anonymous users" ON public.invite_links FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Enable select for anonymous users" ON public.invite_links FOR SELECT TO anon USING (true);

-- meeting_responses
-- anon insert: valid invite일 때만 프론트 검증 후 insert
-- anon select: host dashboard 용도는 현재 auth 없으므로 제한이 약함. 남은 이슈로 기록
CREATE POLICY "Enable insert for anonymous users" ON public.meeting_responses FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Enable select for anonymous users" ON public.meeting_responses FOR SELECT TO anon USING (true);

-- confirmed_plans
-- anon upsert/select는 MVP용. owner/auth 전에는 보안 한계 있음.
CREATE POLICY "Enable insert for anonymous users" ON public.confirmed_plans FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Enable select for anonymous users" ON public.confirmed_plans FOR SELECT TO anon USING (true);
CREATE POLICY "Enable update for anonymous users" ON public.confirmed_plans FOR UPDATE TO anon USING (true);
*/
