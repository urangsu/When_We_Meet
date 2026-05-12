import React from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Check, CalendarHeart } from 'lucide-react';
import { motion } from 'motion/react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { useGuestResponseDraft } from '../../state/GuestResponseDraftContext';
import { getActivityLabels } from '../../utils/activity';

export const GuestCompleteScreen = () => {
  const navigate = useNavigate();
  const { draft } = useGuestResponseDraft();

  const activityDisplay = draft.activityIds.length > 0 
    ? getActivityLabels(draft.activityIds).join(', ')
    : '선택 안 함';

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
          {draft.nickname ? `${draft.nickname}님, ` : ''}응답 완료!
        </h1>
        <p className="text-ink-muted text-sm px-4">호스트가 일정을 확정하면 다시 알려드릴게요.</p>
      </div>

      <div className="w-full bg-white border border-ink-line rounded-2xl p-5 flex flex-col gap-3 mt-6 shadow-sm text-left">
        <h3 className="font-bold text-sm text-ink-muted border-b border-ink-line pb-2">작성한 내용</h3>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-ink-hint">참석 여부</span>
          <span className="text-sm font-bold text-ink">{attendanceLabel}</span>
        </div>
        {draft.attendance !== 'no' && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-ink-hint">선택한 날짜</span>
              <span className="text-sm font-bold text-ink">
                {draft.dateLabels.length > 0 ? `${draft.dateLabels.length}개 선택함` : '선택 안 함'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-ink-hint">장소 후보</span>
              <span className="text-sm font-bold text-ink max-w-[150px] truncate text-right">
                {draft.placeCandidate || '선택 안 함'}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-ink-hint whitespace-nowrap">하고 싶은 것</span>
              <span className="text-sm font-bold text-ink max-w-[150px] text-right break-words">
                {activityDisplay}
              </span>
            </div>
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
