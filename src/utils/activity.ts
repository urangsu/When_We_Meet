import { activityOptions } from '../config/activityOptions';
import type { ActivityOptionId } from '../types/meeting';

export const getActivityLabel = (id: ActivityOptionId) => {
  return activityOptions.find((option) => option.id === id)?.label ?? id;
};

export const getActivityLabels = (ids: ActivityOptionId[]) => {
  return ids.map(getActivityLabel);
};
