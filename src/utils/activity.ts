import { activityOptions } from '../config/activityOptions';
import type { ActivityOptionId } from '../types/meeting';

export const getActivityLabel = (id: ActivityOptionId) => {
  return activityOptions.find((option) => option.id === id)?.label ?? id;
};

export const getActivityLabels = (ids: ActivityOptionId[]) => {
  return ids.map(getActivityLabel);
};

export const getActivityDisplayText = (
  ids: ActivityOptionId[],
  customActivity?: string
) => {
  const labels = ids.map((id) => {
    if (id === 'custom' && customActivity?.trim()) {
      return customActivity.trim();
    }
    return getActivityLabel(id);
  });

  return labels.join(' · ');
};
