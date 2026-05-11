import { CalendarCheck, Sparkles, MailOpen, Briefcase, type LucideIcon } from 'lucide-react';
import type { ThemeId } from '../types';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  lines: [string, string];
  icon: LucideIcon;
}

export const themeOptions: ThemeOption[] = [
  { id: 'calendar-kiss', label: 'Calendar Kiss', lines: ['Calendar', 'Kiss'], icon: CalendarCheck },
  { id: 'invite-spark', label: 'Invite Spark', lines: ['Invite', 'Spark'], icon: Sparkles },
  { id: 'brunch-letter', label: 'Brunch Letter', lines: ['Brunch', 'Letter'], icon: MailOpen },
  { id: 'office-escape', label: 'Office Escape', lines: ['Office', 'Escape'], icon: Briefcase },
];
