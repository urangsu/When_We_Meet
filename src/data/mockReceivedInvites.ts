export type ReceivedInviteStatus = 'unopened' | 'opened';

export interface ReceivedInvite {
  id: string;
  title: string;
  fromName: string;
  status: ReceivedInviteStatus;
  receivedAt: string;
  themeLabel: string;
}

export const mockReceivedInvites: ReceivedInvite[] = [
  {
    id: 'invite-1',
    title: '수민이의 생일 모임',
    fromName: '수민',
    status: 'unopened',
    receivedAt: '방금 전',
    themeLabel: '핑크 편지',
  },
  {
    id: 'invite-2',
    title: '퇴근 후 카페',
    fromName: '지수',
    status: 'opened',
    receivedAt: '어제',
    themeLabel: '캘린더 카드',
  },
];
