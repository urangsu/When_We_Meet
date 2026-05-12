export const isWeekendLabel = (label: string) => {
  return label.includes('(토)') || label.includes('(일)');
};

export const isWeekdayLabel = (label: string) => {
  return ['(월)', '(화)', '(수)', '(목)', '(금)'].some((day) =>
    label.includes(day)
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
    hasEveningTime: timeLabels.some((label) =>
      label.includes('오후 6') ||
      label.includes('오후 7') ||
      label.includes('오후 8')
    ),
    hasActivity: activityIds.length > 0,
  };
};
