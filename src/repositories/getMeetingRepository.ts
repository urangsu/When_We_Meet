import type { MeetingRepository } from './meetingRepository';
import { backendMeetingRepository } from './backendMeetingRepository';
import { localMeetingRepository } from './localMeetingRepository';
import { getRepositoryMode } from './repositoryMode';

export const getMeetingRepository = (): MeetingRepository => {
  const mode = getRepositoryMode();

  if (mode === 'backend') {
    return backendMeetingRepository;
  }

  return localMeetingRepository;
};

export const meetingRepository = getMeetingRepository();
