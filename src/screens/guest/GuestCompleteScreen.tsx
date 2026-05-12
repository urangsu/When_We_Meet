import React from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Check, CalendarHeart } from 'lucide-react';
import { motion } from 'motion/react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { useGuestResponseDraft } from '../../state/GuestResponseDraftContext';
import { getActivityDisplayItems } from '../../utils/activity';

export const GuestCompleteScreen = () => {
  const navigate = useNavigate();
  const { draft } = useGuestResponseDraft();

  const activityItems = draft.activityIds.length > 0 
    ? getActivityDisplayItems(draft.activityIds, draft.customActivity)
    : [];

  const attendanceLabel = 
    draft.attendance === 'yes' ? '갈게요' :
    draft.attendance === 'no' ? '어려워요' : '모르겠어요';

  return (
    <ScreenShell className="items-center justify-center text-center p-5 pt-12">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-20 h-20 bg-rose rounded-full flex items-center justify-center text-white mb-4 shadow-warm shrink-0"
      >
        <Check size={40} strokeWidth={3} />
      </motion.div>

      <div className="flex flex-col gap-2 shrink-0">
        <h1 className="font-bold text-2xl">
          {draft.nickname ? `${draft.nickname}님, ` : ''}답장 보냈어요!
        </h1>
        <p className="text-ink-muted text-sm px-4">의견을 모아서 확정되면 알려드릴게요.<br/>호스트가 링크를 공유할 때까지 기다려주세요.</p>
      </div>

      <div className="w-full bg-white border border-line rounded-2xl p-5 flex flex-col gap-3 mt-6 shadow-sm text-left">
        <h3 className="font-bold text-sm text-ink-hint border-b border-line pb-2">내 답장 요약</h3>
        
        <div className="flex justify-between items-start gap-4">
          <span className="text-sm font-medium text-ink-hint shrink-0">닉네임</span>
          <span className="text-sm font-bold text-ink text-right">{draft.nickname || '(입력 안 함)'}</span>
        </div>
        
        <div className="flex justify-between items-start gap-4">
          <span className="text-sm font-medium text-ink-hint shrink-0">참석 여부</span>
          <span className="text-sm font-bold text-ink text-right">
            {draft.attendance === 'yes' ? '갈게!' : draft.attendance === 'no' ? '못 가 서운해' : '아직 몰라'}
          </span>
        </div>

        {draft.attendanceMessage && (
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm font-medium text-ink-hint shrink-0">답장</span>
            <span className="text-sm font-bold text-ink text-right break-words max-w-[200px]">"{draft.attendanceMessage}"</span>
          </div>
        )}

        {draft.attendance !== 'no' && (
          <>
            {(draft.dateLabels && draft.dateLabels.length > 0) && (
              <div className="flex justify-between items-start gap-4">
                <span className="text-sm font-medium text-ink-hint shrink-0">선택한 날짜</span>
                <span className="text-sm font-bold text-ink text-right break-words max-w-[200px]">{draft.dateLabels.join(', ')}</span>
              </div>
            )}

            {(draft.suggestedDateLabels && draft.suggestedDateLabels.length > 0) && (
              <div className="flex justify-between items-start gap-4">
                <span className="text-sm font-medium text-ink-hint shrink-0">제안한 날짜</span>
                <span className="text-sm font-bold text-primary-deep text-right break-words max-w-[200px]">{draft.suggestedDateLabels.join(', ')}</span>
              </div>
            )}

            {draft.placeCandidate && (
              <div className="flex justify-between items-start gap-4">
                <span className="text-sm font-medium text-ink-hint shrink-0">만날 곳 후보</span>
                <span className="text-sm font-bold text-ink text-right break-words max-w-[200px]">{draft.placeCandidate}</span>
              </div>
            )}

            {activityItems.length > 0 && (
              <div className="flex justify-between items-start gap-4">
                <span className="text-sm font-medium text-ink-hint shrink-0">뭐 할지</span>
                <div className="flex flex-col gap-1 items-end text-sm font-bold text-ink text-right break-words">
                  {activityItems.map((item, idx) => (
                    <span key={idx}>{item}</span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="w-full bg-cream border border-ink-line rounded-2xl p-5 flex flex-col items-center gap-3 mt-auto shadow-sm">
        <CalendarHeart size={28} className="text-rose" />
        <p className="font-bold text-sm text-ink text-center">
          나도 친구들과의 약속을<br/>쉽게 잡고 싶다면?
        </p>
        <Button onClick={() => navigate('/app')} size="full" className="mt-1">
          우리 언제 만나 시작하기
        </Button>
      </div>
    </ScreenShell>
  );
};
