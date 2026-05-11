import { useState } from 'react';
import { getKoreanDayOfWeek, toDateKey } from '../utils/calendar';
import { busyDays } from '../data/mockCalendar';

export const useDateCandidatePicker = (year: number, month: number) => {
  const [selectedDates, setSelectedDates] = useState<number[]>([]);

  const toggleDate = (day: number) => {
    setSelectedDates(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day].sort((a,b)=>a-b)
    );
  };

  const selectedDateLabels = selectedDates.map(date => {
    const dayOfWeek = getKoreanDayOfWeek(year, month, date);
    return {
      day: date,
      label: `${month}월 ${date}일 (${dayOfWeek})`
    };
  });

  const getBusyCount = (day: number) => {
    const dateKey = toDateKey(year, month, day);
    const busyInfo = busyDays.find(item => item.dateKey === dateKey);
    return busyInfo ? busyInfo.busyCount : 0;
  };

  return {
    selectedDates,
    toggleDate,
    selectedDateLabels,
    getBusyCount
  };
};
