import React, { useEffect, useState, useRef } from 'react';
import { Check, Copy, LayoutDashboard } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { Button } from '../../components/Button';
import { getInviteShareUrl, getInviteHashPath } from '../../utils/shareUrls';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';
import { meetingRepository } from '../../repositories/getMeetingRepository';
import { readJson, writeJson } from '../../repositories/localStorageAdapter';

const SHARE_SESSION_KEY = 'wwm:last-created-share:v1';

interface LastCreatedShare {
  draftTitle: string;
  meetingId: string;
  inviteToken: string;
}

export const ShareScreen = () => {
  const navigate = useNavigate();
  const { draft } = useCreateMeetingDraft();
  const [shareState, setShareState] = useState<'loading' | 'ready' | 'failed'>('loading');
  const [inviteUrl, setInviteUrl] = useState('');
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const createdRef = useRef(false);

  useEffect(() => {
    if (createdRef.current) return;
    createdRef.current = true;

    const create = async () => {
      try {
        const existing = readJson<LastCreatedShare | null>(SHARE_SESSION_KEY, null);

        if (existing?.draftTitle === draft.title) {
          const nextUrl = getInviteShareUrl({
            meetingId: existing.meetingId,
            token: existing.inviteToken,
          });

          setInviteUrl(nextUrl);
          setMeetingId(existing.meetingId);
          setShareState('ready');
          return;
        }

        const result = await meetingRepository.createMeetingWithInviteLink(draft);
        const nextUrl = getInviteShareUrl({
          meetingId: result.meetingId,
          token: result.inviteToken,
        });

        writeJson(SHARE_SESSION_KEY, {
          draftTitle: draft.title,
          meetingId: result.meetingId,
          inviteToken: result.inviteToken,
        });

        setInviteUrl(nextUrl);
        setMeetingId(result.meetingId);
        setShareState('ready');
      } catch {
        setShareState('failed');
      }
    };

    create();
  }, [draft]);

  const displayUrl = inviteUrl ? `/#/invite/${meetingId}/${'...'}` : getInviteHashPath({ demo: true });

  if (shareState === 'loading') {
    return <ScreenShell className="items-center justify-center">초대장을 생성 중입니다...</ScreenShell>;
  }

  if (shareState === 'failed') {
    return <ScreenShell className="items-center justify-center">초대장 생성에 실패했습니다.</ScreenShell>;
  }

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-8 items-center justify-center text-center p-5 pt-20">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white mb-4 shadow-warm"
      >
        <Check size={40} strokeWidth={3} />
      </motion.div>
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-3xl">초대장이 완성되었어요!</h1>
        <p className="text-ink-muted font-medium">이제 친구들에게 링크를 공유해 주세요</p>
      </div>
      <div className="w-full bg-white border border-line rounded-2xl p-6 flex flex-col gap-6 mt-4 shadow-soft">
        <div className="flex items-center justify-between p-4 bg-surface-warm rounded-2xl">
          <span className="text-ink-hint font-mono text-sm truncate mr-4">whenwemeet.app{displayUrl}</span>
          <button onClick={() => {
            navigator.clipboard.writeText(inviteUrl).then(() => alert("초대장이 복사되었습니다."));
          }} className="text-primary font-bold flex items-center gap-2 text-sm shrink-0">
            <Copy size={16} /> 초대장 복사
          </button>
        </div>
      </div>
      <BottomCTA withBottomNav>
        <Button onClick={() => navigate(`/app/meetings/${meetingId}/dashboard`)} size="full" variant="outline">
          <LayoutDashboard size={20}/> 응답 현황 보기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
