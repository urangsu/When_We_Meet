import { CalendarCheck, Sparkles, MailOpen, Briefcase, type LucideIcon } from 'lucide-react';
import type { ThemeId } from '../types';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  lines: [string, string];
  icon: LucideIcon;
}

export const themeOptions: ThemeOption[] = [
  { id: 'calendar-kiss', label: '포근한 약속', lines: ['포근한', '약속'], icon: CalendarCheck },
  { id: 'invite-spark', label: '반짝이는 초대', lines: ['반짝이는', '초대'], icon: Sparkles },
  { id: 'brunch-letter', label: '식사 편지', lines: ['식사', '편지'], icon: MailOpen },
  { id: 'office-escape', label: '퇴근 후 만남', lines: ['퇴근 후', '만남'], icon: Briefcase },
];
