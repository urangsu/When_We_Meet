import React, { useEffect, useState, useRef } from 'react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { ChevronLeft, ChevronRight, PencilLine } from 'lucide-react';
import { ourCalendarRepository } from '../../repositories/getOurCalendarRepository';
import { getMonthDays, getMonthStartOffset } from '../../utils/calendar';
import { 
  getCalendarContextByDateKey,
} from '../../utils/ourCalendar';
import { createPngFileFromElement, shareImageFile } from '../../utils/shareImage';
import { OurCalendarShareCard } from '../../components/calendar/OurCalendarShareCard';
import { CalendarDayCell } from '../../components/meeting/CalendarDayCell';
import { Button } from '../../components/Button';
import { CalendarRecordDrawer } from '../../components/calendar/CalendarRecordDrawer';
import type {
  ExternalCalendarHint,
  OurCalendarEvent,
  OurCalendarMemo,
} from '../../types/calendar';

export const CalendarTabScreen = () => {
  const [visibleYear, setVisibleYear] = useState(2026);
  const [visibleMonth, setVisibleMonth] = useState(6);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>('2026-06-21');

  const [events, setEvents] = useState<OurCalendarEvent[]>([]);
  const [memos, setMemos] = useState<OurCalendarMemo[]>([]);
  const [externalHints, setExternalHints] = useState<ExternalCalendarHint[]>([]);
  const [shareState, setShareState] = useState<'idle' | 'creating' | 'shared' | 'downloaded' | 'failed'>('idle');

  const [recordDrawerOpen, setRecordDrawerOpen] = useState(false);
  const [editingMemo, setEditingMemo] = useState<OurCalendarMemo | null>(null);

  const shareCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ourCalendarRepository.getCalendarEvents().then(setEvents);
    ourCalendarRepository.getCalendarMemos().then(setMemos);
    ourCalendarRepository.getExternalHints().then(setExternalHints);
  }, []);

  const goToPreviousMonth = () => {
    setSelectedDateKey(null);
    setVisibleMonth((prev) => {
      let m = prev - 1;
      let y = visibleYear;
      if (m === 0) {
        m = 12;
        y -= 1;
        setVisibleYear(y);
      }
      return m;
    });
  };

  const goToNextMonth = () => {
    setSelectedDateKey(null);
    setVisibleMonth((prev) => {
      let m = prev + 1;
      let y = visibleYear;
      if (m === 13) {
        m = 1;
        y += 1;
        setVisibleYear(y);
      }
      return m;
    });
  };

  const daysInMonth = getMonthDays(visibleYear, visibleMonth);
  const startOffset = getMonthStartOffset(visibleYear, visibleMonth);

  const toDateKey = (d: number) =>
    `${visibleYear}-${String(visibleMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const selectedContext = selectedDateKey
    ? getCalendarContextByDateKey({
        dateKey: selectedDateKey,
        events,
        memos,
        externalHints,
      })
    : null;

  const handleShareImage = async () => {
    if (!shareCardRef.current || !selectedDateKey) return;

    setShareState('creating');

    try {
      const file = await createPngFileFromElement(
        shareCardRef.current,
        `when-we-meet-calendar-${selectedDateKey}.png`
      );

      const result = await shareImageFile(file);
      setShareState(result);
    } catch {
      setShareState('failed');
    }
  };

  const openRecordDrawer = (dateKey: string, memo?: OurCalendarMemo) => {
    setSelectedDateKey(dateKey);
    setEditingMemo(memo || null);
    setRecordDrawerOpen(true);
  };

  const handleSaveRecord = async (input: { title: string; body: string; tags: string[]; visibility: OurCalendarMemo['visibility'] }) => {
    if (!selectedDateKey) return;

    if (editingMemo) {
      await ourCalendarRepository.updateCalendarMemo({
        id: editingMemo.id,
        ...input,
      });
    } else {
      await ourCalendarRepository.createCalendarMemo({
        dateKey: selectedDateKey,
        ...input,
      });
    }

    const nextMemos = await ourCalendarRepository.getCalendarMemos();
    setMemos(nextMemos);
    setRecordDrawerOpen(false);
    setEditingMemo(null);
  };

  const handleDeleteRecord = async (memoId: string) => {
    await ourCalendarRepository.deleteCalendarMemo(memoId);
    const nextMemos = await ourCalendarRepository.getCalendarMemos();
    setMemos(nextMemos);
    setRecordDrawerOpen(false);
    setEditingMemo(null);
  };

  return (
    <ScreenShell withBottomNav className="bg-bg-app">
      <div className="min-h-dvh pb-24">
        <header className="px-5 pt-8 pb-4">
          <h1 className="text-2xl font-bold mb-2">우리 달력</h1>
          <p className="text-ink-muted text-sm leading-relaxed">
            약속 후보, 모임, 메모를 한 곳에 모아요.
          </p>
        </header>

        <div className="px-5 flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-ink-line">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">{visibleYear}년 {visibleMonth}월</h3>
              <div className="flex gap-4">
                <button onClick={goToPreviousMonth} className="text-ink-hint hover:text-ink">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={goToNextMonth} className="text-ink-hint hover:text-ink">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-sm">
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div key={day} className="text-ink-hint font-medium">
                  {day}
                </div>
              ))}
              {Array.from({ length: startOffset }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateKey = toDateKey(day);
                const isSelected = selectedDateKey === dateKey;
                
                const context = getCalendarContextByDateKey({
                  dateKey,
                  events,
                  memos,
                  externalHints,
                });

                return (
                  <CalendarDayCell 
                    key={day} 
                    day={day} 
                    isSelected={isSelected} 
                    busyCount={0} 
                    eventCount={context.events.length}
                    memoCount={context.memos.length}
                    externalHintCount={context.externalHints.length}
                    onClick={() => setSelectedDateKey(dateKey)} 
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-3 text-[11px] text-ink-hint mt-4 pl-1">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose" />
                모임
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                기록
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                일정 힌트
              </span>
            </div>
          </div>

          <section className="bg-white border border-ink-line rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-lg mb-4">
              {selectedDateKey ? `${visibleMonth}월 ${selectedDateKey.split('-')[2]}일의 기록` : '날짜를 선택해보세요'}
            </h3>

            {!selectedDateKey && (
              <p className="text-sm text-ink-muted">달력에서 날짜를 누르면 모임과 메모를 볼 수 있어요.</p>
            )}

            {selectedDateKey && selectedContext && (
               <div className="flex flex-col gap-4">
                 {selectedContext.events.length === 0 && selectedContext.memos.length === 0 && selectedContext.externalHints.length === 0 && (
                   <p className="text-sm text-ink-muted">아직 적어둔 기록이 없어요.</p>
                 )}

                 {selectedContext.events.length > 0 && (
                   <div>
                     {selectedContext.events.map(ev => (
                        <div key={ev.id} className="flex flex-col gap-1 mb-2 last:mb-0 bg-white border border-ink-line p-3 rounded-xl">
                          <p className="font-bold text-ink text-sm flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose inline-block" /> {ev.title}</p>
                          <p className="text-xs text-ink-muted">{ev.type === 'confirmed_meeting' ? '확정된 모임' : '잡고 있는 모임'}</p>
                        </div>
                     ))}
                   </div>
                 )}

                 {selectedContext.memos.length > 0 && (
                   <div>
                     {selectedContext.memos.map(memo => (
                        <div key={memo.id} className="flex flex-col gap-1 mb-2 last:mb-0 bg-amber-50 border border-amber-200/50 p-3 rounded-xl">
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-ink text-sm flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" /> {memo.title}</p>
                            <button
                              type="button"
                              onClick={() => openRecordDrawer(selectedDateKey, memo)}
                              className="text-[11px] font-bold text-amber-600 hover:text-amber-800"
                            >
                              수정
                            </button>
                          </div>
                          <p className="text-xs text-ink-muted">{memo.body}</p>
                        </div>
                     ))}
                   </div>
                 )}

                 {selectedContext.externalHints.length > 0 && (
                   <div>
                     {selectedContext.externalHints.map(hint => (
                        <div key={hint.id} className="flex flex-col gap-1 mb-2 last:mb-0 bg-bg-app border border-ink-line/50 p-3 rounded-xl">
                          <p className="font-bold text-ink text-sm flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" /> {hint.title}</p>
                          <p className="text-xs text-ink-muted">{hint.note}</p>
                        </div>
                     ))}
                   </div>
                 )}

                 <button
                   type="button"
                   onClick={() => openRecordDrawer(selectedDateKey)}
                   className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-ink-line text-sm font-bold text-ink-muted hover:bg-bg-app hover:text-ink transition-colors"
                 >
                   <PencilLine size={16} />
                   새 기록 적기
                 </button>
               </div>
            )}
            
            {selectedDateKey && (
              <div className="mt-6 pt-4 border-t border-ink-line/50">
                <Button onClick={handleShareImage} disabled={shareState === 'creating'}>
                  {shareState === 'creating' ? '사진 만드는 중...' : '선택한 날짜 사진으로 공유'}
                </Button>
                {shareState === 'shared' && <p className="text-xs text-green-600 mt-2 text-center">공유 창이 열렸어요.</p>}
                {shareState === 'downloaded' && <p className="text-xs text-green-600 mt-2 text-center">사진 파일로 다운로드됐어요.</p>}
                {shareState === 'failed' && <p className="text-xs text-rose mt-2 text-center">공유에 실패했어요. 다시 시도해주세요.</p>}
              </div>
            )}
          </section>

          {/* Offscreen Share Card */}
          <div className="fixed left-[-10000px] top-0 pointer-events-none">
            <OurCalendarShareCard
              ref={shareCardRef}
              title="우리 달력 메모"
              dateLabel={selectedDateKey || ''}
              events={selectedContext?.events || []}
              memos={selectedContext?.memos || []}
              externalHints={selectedContext?.externalHints || []}
            />
          </div>
        </div>
      </div>

      <CalendarRecordDrawer
        isOpen={recordDrawerOpen}
        dateKey={selectedDateKey}
        memo={editingMemo}
        onClose={() => {
          setRecordDrawerOpen(false);
          setEditingMemo(null);
        }}
        onSave={handleSaveRecord}
        onDelete={handleDeleteRecord}
      />
    </ScreenShell>
  );
};

