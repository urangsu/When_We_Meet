import { CalendarCheck, Sparkles, MailOpen, Briefcase } from 'lucide-react';
import type { ThemeId } from '../types';
import React from 'react';

export const themes: Array<{
  id: ThemeId;
  label: string;
  icon: React.ComponentType<any>;
}> = [
  { id: 'calendar-kiss', label: 'Calendar Kiss', icon: CalendarCheck },
  { id: 'invite-spark', label: 'Invite Spark', icon: Sparkles },
  { id: 'brunch-letter', label: 'Brunch Letter', icon: MailOpen },
  { id: 'office-escape', label: 'Office Escape', icon: Briefcase },
];
