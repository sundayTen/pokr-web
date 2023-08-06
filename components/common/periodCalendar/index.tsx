import React, { useEffect, useState } from 'react';
import styles from './PeriodCalendar.module.scss';
import MonthCalendar from './monthCalendar';
import dayjs, { Dayjs } from 'dayjs';
import Button from '../button';
import useIsMobile from '@hooks/useIsMobile';

interface PeriodCalendarProps {
  startDate: Dayjs | null;
  setStartDate: (day: Dayjs | null) => void;
  endDate: Dayjs | null;
  setEndDate: (day: Dayjs | null) => void;
  closeCalendar: () => void;
  resetDates: () => void;
}

const PeriodCalendar = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  closeCalendar,
  resetDates,
}: PeriodCalendarProps) => {
  const [standardDate, setStandardDate] = useState(dayjs());

  const { isMobile } = useIsMobile();

  const onChangeMonth = (type: 'prev' | 'next') => {
    setStandardDate((p) => (type === 'prev' ? p.add(-1, 'M') : p.add(1, 'M')));
  };

  const onClickDate = (date: Dayjs) => {
    // 이상한 날짜면 그대로 있는다.
    if (!date.isValid()) {
      return;
    }
    // startDate가 비어있으면 우선 채운다.
    if (startDate === null) {
      setStartDate(date);
      return;
    }

    //둘다 세팅된 상태라면 초기화하고 시작날짜 세팅
    if (startDate !== null && endDate !== null) {
      setStartDate(date);
      setEndDate(null);
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
      <div className={styles.calendarContainer}>
        <MonthCalendar
          year={standardDate.year()}
          month={standardDate.month() + 1}
          type="prev"
          onChangeMonth={onChangeMonth}
          onClickDate={onClickDate}
          startDate={startDate}
          endDate={endDate}
        />
        <div className={styles.divider} />
        <MonthCalendar
          year={standardDate.add(1, 'M').year()}
          month={standardDate.add(1, 'M').month() + 1}
          type="next"
          onChangeMonth={onChangeMonth}
          onClickDate={onClickDate}
          startDate={startDate}
          endDate={endDate}
        />
      </div>

      <div className={styles.buttonGroup}>
        <Button
          buttonStyle="BORDER"
          size="MEDIUM"
          label={'취소'}
          onClick={() => {
            resetDates();
            closeCalendar();
          }}
        />

        <div className={styles.cancelBtn}>
          <Button
            buttonStyle="PAINTED"
            size={isMobile ? 'FULL' : 'MEDIUM'}
            label="확인"
            onClick={closeCalendar}
          />
        </div>
      </div>
    </div>
  );
};

export default PeriodCalendar;
