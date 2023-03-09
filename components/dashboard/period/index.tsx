import { useEffect, useState } from 'react';
import AutoHeightImage from '@components/common/image';
import Select from '@components/common/select';
import ToolTip from '@components/common/tooltip';
import styles from '@components/dashboard/period/DashBoardPeriod.module.scss';
import useMountEffect from '@hooks/useMountEffect';
import { useQuery } from '@tanstack/react-query';
import { METRICS_HALF } from '@api/path';
import { fetchMetrics } from '@api/metrics';
import useIsMobile from '@hooks/useIsMobile';
import dashBoardStore, { GRAPH_DATA } from '@store/dashboard';
import { METRICS } from '@type/metrics';

const periodArr = ['반기', '분기'];
const halfPeriodArr = ['상반기', '하반기'];
const quarterPeriodArr = ['1분기', '2분기', '3분기', '4분기'];

const DashBoardPeriod = () => {
  const { isMobile } = useIsMobile();
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [period, setPeriod] = useState<string>(periodArr[0]);
  const [categorize, setCategorize] = useState<string>(halfPeriodArr[0]);
  const { changeGraphData } = dashBoardStore();

  let metricsNumber = 1;

  const { isError, isLoading, refetch } = useQuery<METRICS[]>(
    [`${period === '반기' ? 'metricsHalf' : 'metricsQuarter'}`],
    () => fetchMetrics(metricsNumber, period === '반기' ? 'half' : 'quarter'),
    {
      suspense: true,
      staleTime: 3000,
      initialData: [],
      onSuccess: (data: METRICS[]) => {
        const setGraphData = data.reduce((acc: GRAPH_DATA[], cur: METRICS) => {
          return [
            ...acc,
            {
              name: cur.label,
              '사용자 평균': cur.me_api,
              '이용자 평균 달성도': cur.all,
            },
          ];
        }, []);

        changeGraphData(setGraphData);
      },
    },
  );

  useMountEffect(() => {
    setCategorize(period === '반기' ? halfPeriodArr[0] : quarterPeriodArr[0]);
    refetch();

    return () => {};
  }, [period]);

  // if (isError || isLoading) {
  //   return <></>;
  // }

  return (
    <div className={styles.root}>
      <div className={styles.periodContainer}>
        {isMobile ? (
          <div>
            <button type="button">반기</button>
            <button type="button">상반기</button>
          </div>
        ) : (
          <div className={styles.periodCategory}>
            <label>
              <span>기간</span>
              <Select value={period} setValue={setPeriod} options={periodArr} />
            </label>
            <label>
              <span className={styles.categorize}>분류</span>
              <Select
                value={categorize}
                options={period === '반기' ? halfPeriodArr : quarterPeriodArr}
                onChange={(e) => {
                  setCategorize(e);

                  if (e === '상반기' || e === '1분기') metricsNumber = 1;
                  else if (e === '하반기' || e === '2분기') metricsNumber = 2;
                  else if (e === '3분기') metricsNumber = 3;
                  else if (e === '4분기') metricsNumber = 4;

                  refetch();
                }}
              />
            </label>
          </div>
        )}
        {!isMobile && (
          <div className={styles.periodOfTime}>
            <button type="button" onClick={() => setTooltipOpen(!tooltipOpen)}>
              <AutoHeightImage
                src="/images/time-clock.png"
                alt="검색"
                width={20}
                height={20}
              />
              <ToolTip
                text="목표 기간 : 2023.01.01 ~ 2023.12.31"
                open={tooltipOpen}
                clasName={styles.tooltip}
              />
            </button>
            148일 15시간 45분 남았어요
          </div>
        )}
      </div>
      <ul className={styles.categoryContainer}>
        <li className={styles.objectives}>
          <AutoHeightImage
            src="/images/objectives.png"
            alt="목표"
            width={48}
            height={48}
          />
          <div>
            <strong>34%</strong>
            <p>Objectives</p>
          </div>
          <div className={styles.progress}>
            <span style={{ width: '34%' }} />
          </div>
        </li>
        <li className={styles.keyResult}>
          <AutoHeightImage
            src="/images/key-result.png"
            alt="결과"
            width={48}
            height={48}
          />
          <div>
            <strong>61%</strong>
            <p>Key Results</p>
          </div>
          <div className={styles.progress}>
            <span style={{ width: '61%' }} />
          </div>
        </li>
        <li className={styles.initiatives}>
          <AutoHeightImage
            src="/images/initiatives.png"
            alt="계획"
            width={48}
            height={48}
          />
          <div>
            <strong>82%</strong>
            <p>Initiatives</p>
          </div>
          <div className={styles.progress}>
            <span style={{ width: '82%' }} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DashBoardPeriod;
