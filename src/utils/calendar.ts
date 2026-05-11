export const toDateKey = (year: number, month: number, day: number) => {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export const getKoreanDayOfWeek = (year: number, month: number, day: number) => {
  const date = new Date(year, month - 1, day);
  return ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
};

export const getMonthDays = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getMonthStartOffset = (year: number, month: number) => {
  return new Date(year, month - 1, 1).getDay();
};
