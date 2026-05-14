import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { X, Trash2 } from 'lucide-react';
import type { OurCalendarMemo } from '../../types/calendar';

interface CalendarRecordDrawerProps {
  isOpen: boolean;
  dateKey: string | null;
  memo?: OurCalendarMemo | null;
  onClose: () => void;
  onSave: (input: {
    title: string;
    body: string;
    tags: string[];
    visibility: OurCalendarMemo['visibility'];
  }) => void | Promise<void>;
  onDelete?: (memoId: string) => void | Promise<void>;
}

const PRESET_TAGS = ['장소', '음식', '준비물', '날씨', '후보', '약속'];

export const CalendarRecordDrawer: React.FC<CalendarRecordDrawerProps> = ({
  isOpen,
  dateKey,
  memo,
  onClose,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<OurCalendarMemo['visibility']>('private');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (memo) {
        setTitle(memo.title);
        setBody(memo.body);
        setTags(memo.tags);
        setVisibility(memo.visibility);
      } else {
        setTitle('');
        setBody('');
        setTags([]);
        setVisibility('private');
      }
      setIsSaving(false);
      setIsDeleting(false);
    }
  }, [isOpen, memo]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) return;
    setIsSaving(true);
    try {
      await onSave({ title, body, tags, visibility });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!memo || !onDelete) return;
    if (!window.confirm('정말 삭제하시겠어요?')) return;
    setIsDeleting(true);
    try {
      await onDelete(memo.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-bg-app rounded-t-3xl sm:rounded-3xl flex flex-col max-h-[90vh] shadow-xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-2 duration-300">
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <div>
            <h2 className="text-xl font-bold text-ink">{memo ? '기록 수정' : '기록 적기'}</h2>
            <p className="text-sm text-ink-muted mt-1">{dateKey}</p>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-ink-hint hover:text-ink transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-4 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-ink">제목</label>
            <input
              type="text"
              placeholder="예) 강남역 모임 후보"
              className="w-full bg-white border border-ink-line rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-rose focus:ring-1 focus:ring-rose"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-ink">메모 내용</label>
            <textarea
              placeholder="기록해둘 내용을 적어주세요."
              className="w-full bg-white border border-ink-line rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-rose focus:ring-1 focus:ring-rose min-h-[120px] resize-none"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-ink">태그 선택</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_TAGS.map((tag) => {
                const isSelected = tags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-bold border transition-colors ${
                      isSelected
                        ? 'bg-ink text-white border-ink'
                        : 'bg-white text-ink-hint border-ink-line hover:border-ink-hint hover:text-ink'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2 pb-4">
            <label className="text-sm font-bold text-ink">누구와 볼까요?</label>
            <div className="flex flex-col gap-2">
              <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${visibility === 'private' ? 'bg-white border-rose ring-1 ring-rose' : 'bg-white border-ink-line hover:bg-bg-app'}`}>
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === 'private'}
                  onChange={() => setVisibility('private')}
                  className="w-4 h-4 text-rose focus:ring-rose accent-rose"
                />
                <span className="text-sm font-bold text-ink">나만 보기</span>
              </label>
              <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${visibility === 'meeting_context' ? 'bg-white border-rose ring-1 ring-rose' : 'bg-white border-ink-line hover:bg-bg-app'}`}>
                <input
                  type="radio"
                  name="visibility"
                  value="meeting_context"
                  checked={visibility === 'meeting_context'}
                  onChange={() => setVisibility('meeting_context')}
                  className="w-4 h-4 text-rose focus:ring-rose accent-rose"
                />
                <span className="text-sm font-bold text-ink">모임 준비에 사용 (모임원 공개)</span>
              </label>
              <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${visibility === 'shared_calendar' ? 'bg-white border-rose ring-1 ring-rose' : 'bg-white border-ink-line hover:bg-bg-app'}`}>
                <input
                  type="radio"
                  name="visibility"
                  value="shared_calendar"
                  checked={visibility === 'shared_calendar'}
                  onChange={() => setVisibility('shared_calendar')}
                  className="w-4 h-4 text-rose focus:ring-rose accent-rose"
                />
                <span className="text-sm font-bold text-ink">공유 달력에 표시 (전체 공개)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 pt-4 border-t border-ink-line/50 flex flex-col sm:flex-row gap-3">
          {memo && (
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={isDeleting || isSaving}
              className="text-rose border-rose/30 hover:bg-rose-50 grow-0 shrink-0 basis-auto px-4"
            >
              {isDeleting ? '삭제 중' : <Trash2 size={20} />}
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={isSaving || !title.trim() || !body.trim()}
            className="w-full flex-1"
          >
            {isSaving ? '저장 중...' : '저장하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};
