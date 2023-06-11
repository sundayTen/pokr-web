import { ValueOf } from '@type/common';
import dayjs from 'dayjs';

// dayjs 로케일 설정 오류로 임시 처리
export const WEEK_KR = {
  Monday: '월',
  Tuesday: '화',
  Wednesday: '수',
  Thursday: '목',
  Friday: '금',
  Saturday: '토',
  Sunday: '일',
} as const;

interface WEEK_CALENDAR_UNIT {
  dayOfTheWeek: ValueOf<typeof WEEK_KR>;
  date: dayjs.Dayjs;
}

// 특정 날짜가 속한 주를 반환합니다.
export const generateWeek = (date: dayjs.Dayjs): dayjs.Dayjs[] => {
  const startOfWeek = dayjs(date).startOf('week');
  const endOfWeek = dayjs(date).endOf('week');

  const weekRange = [];
  let currentDate = startOfWeek;

  while (currentDate.isBefore(endOfWeek) || currentDate.isSame(endOfWeek)) {
    weekRange.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  return weekRange;
};

/**
 * 1주일 날짜를 요일별 일만 string으로 반환합니다.
 * @param week
 */
export const getWeekWithFormat = (
  week: dayjs.Dayjs[],
): WEEK_CALENDAR_UNIT[] => {
  return week.map((day) => {
    return {
      dayOfTheWeek: WEEK_KR[day.format('dddd')],
      date: day,
    };
  });
};
