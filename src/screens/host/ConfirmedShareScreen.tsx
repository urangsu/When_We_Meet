import React, { useEffect, useState, useRef } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, Share2, CalendarPlus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { InitialAvatarGroup } from '../../components/profile/InitialAvatarGroup';
import { meetingRepository } from '../../repositories/getMeetingRepository';
import { ourCalendarRepository } from '../../repositories/getOurCalendarRepository';
import { createPngFileFromElement, shareImageFile } from '../../utils/shareImage';
import { ConfirmedShareCard } from '../../components/meeting/ConfirmedShareCard';
import type { ConfirmedPlan, MeetingResponse } from '../../types/meeting';
import type { ProfileColorId } from '../../types';
import { AnimatePresence, motion } from 'motion/react';

export const ConfirmedShareScreen = () => {
  const navigate = useNavigate();
  const { meetingId } = useParams();
  const confirmedCardRef = useRef<HTMLDivElement>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (text: string) => {
    setNotice(text);
    setTimeout(() => setNotice(null), 3000);
  };

  if (!meetingId) {
    return <ScreenShell className="items-center justify-center p-5 text-center">모임 정보를 찾을 수 없어요.</ScreenShell>;
  }
  const resolvedMeetingId = meetingId;
  const [confirmedPlan, setConfirmedPlan] = useState<ConfirmedPlan | null>(null);
  const [responses, setResponses] = useState<MeetingResponse[]>([]);

  useEffect(() => {
    meetingRepository.getConfirmedPlan(resolvedMeetingId).then(setConfirmedPlan);
    meetingRepository.getMeetingResponses(resolvedMeetingId).then(setResponses);
  }, [resolvedMeetingId]);

  const dateDisplay = confirmedPlan?.dateLabel || '날짜 미정';
  const timeDisplay = confirmedPlan?.timeLabel || '시간 미정';
  const placeDisplay = confirmedPlan?.placeName || '만날 곳 미정';
  const activityItems = confirmedPlan?.activityLabels || [];

  const handleShare = async () => {
    if (!confirmedCardRef.current) return;
    try {
      const file = await createPngFileFromElement(confirmedCardRef.current, 'when_we_meet_confirmed.png');
      await shareImageFile(file, {
        title: '모임이 확정됐어요',
        text: `${dateDisplay} ${timeDisplay} ${placeDisplay}`,
      });
      showNotice('확정 카드를 공유했어요.');
    } catch {
      await navigator.clipboard.writeText(`${dateDisplay} ${timeDisplay} ${placeDisplay}`);
      showNotice('공유가 어려워서 확정 내용을 복사했어요.');
    }
  };

  const handleCalendar = async () => {
    try {
      // NOTE: We should parse dateKey, but this MVP relies on a naive mapped approach or empty date string.
      // E.g. simple regex extraction for demonstration, or default to today if not parsed well.
      const match = dateDisplay.match(/(\d{4})-(\d{2})-(\d{2})/);
      const dateKey = match ? match[0] : new Date().toISOString().split('T')[0];

      await ourCalendarRepository.createCalendarEvent({
        type: 'confirmed_meeting',
        title: '모임', // Optionally fetch meeting title
        dateKey,
        meetingId: resolvedMeetingId,
        timeLabel: timeDisplay,
        colorKey: 'rose',
      });
      showNotice('우리 달력에 저장했어요.');
    } catch {
      showNotice('날짜 형식이 명확하지 않아 우리 달력에 자동 추가하지 못했어요.');
    }
  };

  const participants = responses
    .filter((response) => response.attendance === 'yes' || response.attendance === 'maybe')
    .map((response, index) => ({
      id: response.id,
      name: response.nickname,
      colorId: ['pink', 'skyblue', 'beige', 'gray', 'red', 'white'][index % 6] as ProfileColorId,
    }));

  return (
    <ScreenShell bottomInset="cta" className="gap-6 bg-bg-app">
      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-28 left-5 right-5 z-50 rounded-2xl bg-ink text-white px-4 py-3 text-sm font-bold shadow-lg"
          >
            {notice}
          </motion.div>
        )}
      </AnimatePresence>
      <header className="flex flex-col gap-2 pt-2 px-5">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/app')} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
          <h1 className="font-bold text-2xl">모임이 확정됐어요!</h1>
        </div>
        <p className="text-ink-muted text-sm px-1">
          친구들에게 확정 카드를 공유해보세요.
        </p>
      </header>

      <div className="px-5 flex flex-col items-center pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Preview Card */}
        <div className="w-full max-w-[320px] bg-white rounded-[32px] p-8 shadow-warm border border-rose/20 relative overflow-hidden flex flex-col items-center text-center gap-6 mt-4">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-light via-rose to-rose-deep opacity-50" />
          
          <div className="flex flex-col gap-2 items-center w-full mt-2">
            <h2 className="text-xl font-black text-ink">모임 확정</h2>
            <div className="px-3 py-1 bg-rose-light/50 text-rose-deep text-xs font-bold rounded-full">
              모임이 확정되었어요
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-xl font-black text-rose">{dateDisplay}</span>
            <span className="font-bold text-ink">{timeDisplay}</span>
          </div>

          <div className="flex flex-col items-center w-full gap-3 mt-2">
            <div className="flex w-full bg-bg-app rounded-xl p-3 items-center justify-between gap-4">
              <span className="text-xs font-bold text-ink-hint whitespace-nowrap">만나는 곳</span>
              <span className="text-sm font-bold text-ink text-right">{placeDisplay}</span>
            </div>
            {activityItems.length > 0 && (
              <div className="flex w-full bg-bg-app rounded-xl p-3 items-center justify-between gap-4">
                <span className="text-xs font-bold text-ink-hint whitespace-nowrap">뭐 할지</span>
                <div className="flex flex-col gap-1 items-end text-sm font-bold text-ink text-right break-words min-w-0 max-w-[150px]">
                  {activityItems.map((item, idx) => (
                    <span key={idx}>{item}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {confirmedPlan ? (
             <div className="flex flex-col items-center gap-2 mt-2">
               <span className="text-xs font-bold text-ink-muted mb-1">함께하는 사람들</span>
               <InitialAvatarGroup participants={participants} totalCount={participants.length} maxVisible={3} />
             </div>
           ) : (
             <p className="text-sm text-ink-muted mt-2">아직 저장된 확정안이 없어요.<br />응답 현황에서 모임을 먼저 확정해 주세요.</p>
           )}
        </div>
      </div>

      <div className="fixed left-[-10000px] top-0 pointer-events-none">
        <ConfirmedShareCard ref={confirmedCardRef} confirmedPlan={confirmedPlan} participants={participants} />
      </div>

      <BottomCTA>
        <div className="flex flex-col gap-3 w-full">
          <Button 
            onClick={handleShare}
            size="full"
            className="flex items-center justify-center gap-2"
          >
            <Share2 size={18} />
            카톡/DM으로 공유하기
          </Button>
          <Button 
            onClick={handleCalendar}
            variant="secondary"
            size="full"
            className="flex items-center justify-center gap-2 border bg-white"
          >
            <CalendarPlus size={18} />
            캘린더에 추가하기
          </Button>
        </div>
      </BottomCTA>
    </ScreenShell>
  );
};
