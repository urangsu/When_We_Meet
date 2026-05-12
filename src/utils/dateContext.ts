export const isWeekendLabel = (label: string) => {
  return label.includes('(토)') || label.includes('(일)');
};

export const isWeekdayLabel = (label: string) => {
  return ['(월)', '(화)', '(수)', '(목)', '(금)'].some((day) =>
    label.includes(day)
  );
};

export const isEveningTimeLabel = (label: string) => {
  return (
    label.includes('저녁') ||
    label.includes('퇴근') ||
    label.includes('오후 6') ||
    label.includes('오후 7') ||
    label.includes('오후 8') ||
    label.includes('밤')
  );
};

export const isLunchTimeLabel = (label: string) => {
  return (
    label.includes('점심') ||
    label.includes('오후 12') ||
    label.includes('낮 12')
  );
};

export const getDateMessageContext = (
  dateLabels: string[],
  timeLabels: string[],
  activityIds: string[]
) => {
  return {
    hasWeekendDate: dateLabels.some(isWeekendLabel),
    hasWeekdayDate: dateLabels.some(isWeekdayLabel),
    hasEveningTime: timeLabels.some(isEveningTimeLabel),
    hasLunchTime: timeLabels.some(isLunchTimeLabel),
    hasActivity: activityIds.length > 0,
  };
};
