import React from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, Share2, MapPin, Calendar, User, Clock, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';
import { categoryOptions } from '../../config/categoryOptions';
import { getActivityDisplayItems } from '../../utils/activity';

export const InvitePreviewScreen = () => {
  const navigate = useNavigate();
  const { draft } = useCreateMeetingDraft();
  
  const selectedCategory = categoryOptions.find(c => c.id === draft.category);
  const categoryLabel = selectedCategory ? selectedCategory.label : '모임';
  
  const activityItems = draft.activityIds.length > 0 
    ? getActivityDisplayItems(draft.activityIds, draft.customActivity)
    : [];
  
  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-6">
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="font-bold text-2xl">초대장 미리보기</h1>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-2xl p-8 flex flex-col justify-between shadow-warm relative overflow-hidden bg-[#FFF1F3]">
            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            
            <div className="z-10 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-[0.2em] text-ink-muted uppercase flex items-center gap-2">
                  <Bookmark size={12} className="text-rose"/> 
                  {categoryLabel} {draft.isRecurring ? '· 정기모임' : ''}
                </span>
                <h2 className="font-bold text-3xl leading-tight text-rose-deep">
                  {draft.title || '수민이의 생일 모임'}
                </h2>
              </div>
              <p className="text-lg font-medium text-ink/80 leading-relaxed max-w-[80%] whitespace-pre-wrap">
                {draft.hostMessage || '다같이 모여서 맛있는 밥 먹자!'}
              </p>
            </div>

            <div className="z-10 flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm font-bold text-ink bg-white/60 backdrop-blur-sm self-start px-4 py-2 rounded-full shadow-sm">
                  <User size={16} className="text-rose"/>
                  <span>Host: 수민 (프로토타입)</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-ink bg-white/60 backdrop-blur-sm self-start px-4 py-2 rounded-full shadow-sm">
                  <MapPin size={16} className="text-rose"/>
                  <span>
                    {draft.locationMode === 'fixed' && draft.fixedPlaceName 
                      ? draft.fixedPlaceName 
                      : draft.locationMode === 'candidate_vote'
                        ? '만날 곳 투표 예정'
                        : '만날 곳 미정'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-ink bg-white/60 backdrop-blur-sm self-start px-4 py-2 rounded-full shadow-sm">
                  <Calendar size={16} className="text-rose"/>
                  <span>
                    {draft.dateLabels.length > 0
                      ? `${draft.dateLabels[0]} 등 ${draft.dateLabels.length}개`
                      : '날짜 후보 투표 예정'}
                  </span>
                </div>
                {draft.timeMode !== 'undecided' && (
                  <div className="flex items-center gap-3 text-sm font-bold text-ink bg-white/60 backdrop-blur-sm self-start px-4 py-2 rounded-full shadow-sm">
                    <Clock size={16} className="text-rose"/>
                    <span>
                      {draft.timeMode === 'fixed' && draft.timeLabels.length > 0
                        ? draft.timeLabels[0]
                        : '시간 후보 투표 예정'}
                    </span>
                  </div>
                )}
                {activityItems.length > 0 && (
                  <div className="flex flex-col gap-2 bg-white/60 backdrop-blur-sm self-start px-4 py-3 rounded-2xl shadow-sm">
                    <span className="text-xs font-bold text-rose uppercase tracking-widest leading-none">뭐 할지</span>
                    <div className="flex flex-col gap-1">
                      {activityItems.map((item, idx) => (
                        <span key={idx} className="text-sm font-bold text-ink leading-tight">{item}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Decorative Sparkle */}
            <div className="absolute top-8 right-8 text-rose/30">
              <div className="text-4xl">✨</div>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomCTA withBottomNav>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-center text-xs text-ink-hint">초대장을 보내기 전 마지막으로 확인해 주세요</p>
          <Button onClick={() => navigate('/app/create/share')} size="full">
            <Share2 size={20}/> 링크 공유하기
          </Button>
        </div>
      </BottomCTA>
    </ScreenShell>
  );
};
