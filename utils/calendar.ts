import dayjs from 'dayjs';

export const WEEK_UNIT = 7;

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
 * 한 달치 달력 데이터를 반환합니다.
 * @param {string} year YYYY
 * @param {string} month MM
 * @returns
 */
export const getCalendar = (year: number, month: number) => {
  const date = dayjs(`${year}-${month}-01`);
  const startDay = date.startOf('month').day();
  const lastDay = date.endOf('month').date();
  const calendarData = [];

  if (startDay > 0) {
    for (let i = 0; i < startDay; i++) {
      calendarData.push({ date: '', day: '' });
    }
  }

  for (let i = 1; i <= lastDay; i++) {
    const formattedDate = date.date(i).format('YYYY-MM-DD');
    const day = date.date(i).format('dddd');
    calendarData.push({ date: formattedDate, day });
  }

  return calendarData;
};
