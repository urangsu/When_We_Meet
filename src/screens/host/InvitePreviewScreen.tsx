import React, { useState, useRef } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, Share2, MapPin, Calendar, User, Clock, Bookmark, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';
import { categoryOptions } from '../../config/categoryOptions';
import { getActivityDisplayItems } from '../../utils/activity';
import { getDateMessageContext } from '../../utils/dateContext';
import {
  getPlaceContext,
  getContextualInviteCopySuggestions,
} from '../../config/contextualInviteCopy';
import { getCalendarMemoRecommendations } from '../../utils/calendarMemoRecommendations';
import { InvitationOpeningMotion } from '../../components/invite/InvitationOpeningMotion';
import { InviteShareCard } from '../../components/invite/InviteShareCard';
import { createPngFileFromElement, shareImageFile } from '../../utils/shareImage';

export const InvitePreviewScreen = () => {
  const navigate = useNavigate();
  const { draft, updateDraft } = useCreateMeetingDraft();
  const [showMotionPreview, setShowMotionPreview] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [isSharingImage, setIsSharingImage] = useState(false);
  
  const selectedCategory = categoryOptions.find(c => c.id === draft.category);
  const categoryLabel = selectedCategory ? selectedCategory.label : '모임';
  
  const activityItems = draft.activityIds.length > 0 
    ? getActivityDisplayItems(draft.activityIds, draft.customActivity)
    : [];

  const dateContext = getDateMessageContext(
    draft.dateLabels,
    draft.timeLabels,
    draft.activityIds
  );

  const smartSuggestions = getContextualInviteCopySuggestions({
    placeContext: getPlaceContext(draft.fixedPlaceName),
    activityIds: draft.activityIds,
    customActivity: draft.customActivity,
    hasWeekendDate: dateContext.hasWeekendDate,
    hasWeekdayDate: dateContext.hasWeekdayDate,
    hasEveningTime: dateContext.hasEveningTime,
    hasLunchTime: dateContext.hasLunchTime,
  });

  const copyRecommendations = getCalendarMemoRecommendations({
    notes: draft.attachedCalendarMemoNotes,
    tags: draft.attachedCalendarMemoTags,
  }).filter((item) => item.type === 'invite_copy');

  const getPlaceLabel = () => {
    if (draft.locationMode === 'fixed' && draft.fixedPlaceName) return draft.fixedPlaceName;
    if (draft.locationMode === 'candidate_vote') return '친구들과 함께 결정';
    return undefined;
  };

  const getActivityLabel = () => {
    if (draft.activityMode === 'decided' && (draft.activityIds.length || draft.customActivity)) {
      return draft.activityIds.length ? `${draft.activityIds.length}개의 후보` : draft.customActivity;
    }
    if (draft.activityMode === 'vote') return '친구들과 함께 결정';
    return undefined;
  };

  const handleShareInviteImage = async () => {
    if (!shareCardRef.current) return;

    setIsSharingImage(true);

    try {
      const file = await createPngFileFromElement(
        shareCardRef.current,
        'when_we_meet_invite_preview.png'
      );

      await shareImageFile(file, {
        title: draft.title || '새로운 초대장',
        text: draft.hostMessage || '초대장을 확인해 주세요.',
      });
    } catch (error) {
      console.error('Failed to share image', error);
      alert('초대장 사진을 공유할 수 없어요.');
    } finally {
      setIsSharingImage(false);
    }
  };
  
  if (showMotionPreview) {
    return (
      <InvitationOpeningMotion
        title={draft.title || '새로운 초대장'}
        hostName="호스트"
        message={draft.hostMessage || '같이 시간 맞춰볼까요?\n가능한 날짜와 하고 싶은 걸 가볍게 골라주세요.'}
        dateLabel={draft.dateLabels.length ? `${draft.dateLabels.length}개의 날짜 후보` : undefined}
        placeLabel={getPlaceLabel()}
        activityLabel={getActivityLabel()}
        themeId={draft.themeId}
        preview
        onComplete={() => setShowMotionPreview(false)}
      />
    );
  }
  
  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-6">
      <div className="fixed left-[-10000px] top-0 pointer-events-none">
        <InviteShareCard draft={draft} ref={shareCardRef} />
      </div>

      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="font-bold text-2xl">초대장 미리보기</h1>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10 gap-6 flex flex-col">
        <div className="flex justify-between items-center px-1">
          <p className="text-sm font-bold text-ink">게스트가 보게 될 초대장</p>
          <button 
            onClick={() => setShowMotionPreview(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-rose bg-rose-50 px-3 py-1.5 rounded-full hover:bg-rose-100 transition-colors"
          >
            <PlayCircle size={14} /> 모션 미리보기
          </button>
        </div>

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
                  {draft.title || '새로운 초대장'}
                </h2>
              </div>
              <p className="text-lg font-medium text-ink/80 leading-relaxed max-w-[80%] whitespace-pre-wrap">
                {draft.hostMessage || '편한 날 골라주면 제가 맞춰볼게요.'}
              </p>
            </div>

            <div className="z-10 flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm font-bold text-ink bg-white/60 backdrop-blur-sm self-start px-4 py-2 rounded-full shadow-sm">
                  <User size={16} className="text-rose"/>
                  <span>Host: 호스트</span>
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

        {draft.attachedCalendarMemoNotes.length > 0 && (
          <section className="bg-bg-app border border-ink-line rounded-2xl p-4 mt-2">
            <p className="text-xs font-bold text-ink-muted mb-2">
              이런 분위기도 생각하고 있어요
            </p>
            {draft.attachedCalendarMemoNotes.slice(0, 2).map((note, index) => (
              <p key={index} className="text-sm text-ink line-clamp-2">
                {note}
              </p>
            ))}
          </section>
        )}

        {copyRecommendations.length > 0 && (
          <section className="bg-white border border-ink-line rounded-2xl p-4 mt-2">
            <p className="text-xs font-bold text-rose mb-3">달력 기록으로 추천한 초대 문구</p>
            <div className="space-y-2">
              {copyRecommendations.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => updateDraft({ hostMessage: item.label })}
                  className={`
                    w-full text-left rounded-xl border p-3 transition-all
                    ${draft.hostMessage === item.label
                      ? 'border-rose bg-rose-light/20'
                      : 'border-ink-line hover:bg-neutral-50'
                    }
                  `}
                >
                  <p className="text-sm font-bold text-ink">{item.label}</p>
                  <p className="text-xs text-ink-muted mt-1">{item.reason}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-line bg-surface p-4 shadow-soft">
          <div className="mb-3">
            <p className="text-sm font-bold text-ink">문구 맞춰보기</p>
            <p className="mt-1 text-xs text-ink-hint">
              만날 곳과 뭐 할지에 맞춰 가볍게 골라봤어요.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {smartSuggestions.map((suggestion) => {
              const isSelected = draft.hostMessage === suggestion;
              return (
                <button
                  key={suggestion}
                  onClick={() => updateDraft({ hostMessage: suggestion })}
                  className={`
                    rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all active:scale-[0.99]
                    ${isSelected
                      ? 'border-primary bg-primary-soft text-primary-deep'
                      : 'border-line bg-surface-warm text-ink'
                    }
                  `}
                >
                  {suggestion}
                  {isSelected && (
                    <span className="mt-1 block text-[11px] font-bold text-primary-deep">
                      현재 적용 중
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <BottomCTA withBottomNav>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-center text-xs text-ink-hint">작성한 내용으로 초대장 이미지를 볼 수 있어요</p>
          <Button onClick={handleShareInviteImage} disabled={isSharingImage} size="full" className="shadow-warm bg-rose-50 border border-rose-200 text-rose-deep hover:bg-rose-100">
            {isSharingImage ? '이미지 생성 중...' : <><Share2 size={18}/> 초대장 사진으로 미리 공유</>}
          </Button>
          <Button onClick={() => navigate('/app/create/share')} size="full">
            <Share2 size={20}/> 링크 만들기
          </Button>
        </div>
      </BottomCTA>
    </ScreenShell>
  );
};
