import React from 'react';
import { CalendarCheck, Sparkles, MailOpen, Briefcase } from 'lucide-react';
import type { ThemeId } from '../types';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  icon: React.ComponentType<any>;
}

export const themeOptions: ThemeOption[] = [
  { id: 'calendar-kiss', label: 'Calendar Kiss', icon: CalendarCheck },
  { id: 'invite-spark', label: 'Invite Spark', icon: Sparkles },
  { id: 'brunch-letter', label: 'Brunch Letter', icon: MailOpen },
  { id: 'office-escape', label: 'Office Escape', icon: Briefcase },
];
