import type { OurCalendarRepository } from './ourCalendarRepository';
import { localOurCalendarRepository } from './localOurCalendarRepository';

export const getOurCalendarRepository = (): OurCalendarRepository => {
  return localOurCalendarRepository;
};

export const ourCalendarRepository = getOurCalendarRepository();
