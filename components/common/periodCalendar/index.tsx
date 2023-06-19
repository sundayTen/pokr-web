import React, { useEffect, useState } from 'react';
import styles from './PeriodCalendar.module.scss';
import MonthCalendar from './monthCalendar';
import dayjs, { Dayjs } from 'dayjs';

const PeriodCalendar = ({}) => {
  const [standardDate, setStandardDate] = useState(dayjs());
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  console.log(
    '🚀 ~ file: index.tsx:10 ~ PeriodCalendar ~ endDate:',
    endDate?.format('YYYY MM DD'),
  );
  console.log(
    '🚀 ~ file: index.tsx:10 ~ PeriodCalendar ~ startDate:',
    startDate?.format('YYYY MM DD'),
  );

  const onChangeMonth = (type: 'prev' | 'next') => {
    setStandardDate((p) => (type === 'prev' ? p.add(-1, 'M') : p.add(1, 'M')));
  };

  const onClickDate = (date: Dayjs) => {
    // startDate가 비어있으면 우선 채운다.
    if (startDate === null) {
      setStartDate(date);
      return;
    }

    // 이미 startDate가 세팅되어 있지만 그 이전 날짜를 클릭하면 다시 세팅
    if (startDate.isAfter(date)) {
      setStartDate(date);
      return;
    }

    // startDate와 endDate가 같으면 아무것도 하지 않는다.
    if (startDate.isSame(date, 'D')) {
      return;
    }

    if (startDate.isBefore(date, 'D')) {
      setEndDate(date);
      return;
    }

    if (startDate !== null || endDate !== null) {
      setStartDate(date);
      setEndDate(null);
    }
  };

  return (
    <div className={styles.root}>
      <MonthCalendar
        year={standardDate.year()}
        month={standardDate.month()}
        type="prev"
        onChangeMonth={onChangeMonth}
        onClickDate={onClickDate}
        startDate={startDate}
        endDate={endDate}
      />
      <div className={styles.divider} />
      <MonthCalendar
        year={standardDate.add(1, 'M').year()}
        month={standardDate.add(1, 'M').month()}
        type="next"
        onChangeMonth={onChangeMonth}
        onClickDate={onClickDate}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

export default PeriodCalendar;
