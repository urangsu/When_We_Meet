import { CalendarCheck, Sparkles, MailOpen, Briefcase, type LucideIcon } from 'lucide-react';
import type { ThemeId } from '../types';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  lines: [string, string];
  description?: string;
  icon: LucideIcon;
}

export const themeOptions: ThemeOption[] = [
  { 
    id: 'calendar-kiss', 
    label: '포근한 약속', 
    lines: ['포근한', '약속'], 
    description: '따뜻하고 부드러운 무드',
    icon: CalendarCheck 
  },
  { 
    id: 'invite-spark', 
    label: '반짝이는 초대', 
    lines: ['반짝이는', '초대'], 
    description: '밝고 설레는 무드',
    icon: Sparkles 
  },
  { 
    id: 'brunch-letter', 
    label: '식사 편지', 
    lines: ['식사', '편지'], 
    description: '차분하고 정갈한 무드',
    icon: MailOpen 
  },
  { 
    id: 'office-escape', 
    label: '퇴근 후 만남', 
    lines: ['퇴근 후', '만남'], 
    description: '깔끔하고 캐주얼한 무드',
    icon: Briefcase 
  },
  {
    id: 'prince',
    label: '백마탄 왕자님',
    lines: ['백마탄', '왕자님'],
    description: '특별한 영상 인트로',
    icon: Sparkles
  },
];
