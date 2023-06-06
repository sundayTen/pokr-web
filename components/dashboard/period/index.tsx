import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import AutoHeightImage from '@components/common/autoHeightImage';
import Select from '@components/common/select';
import ToolTip from '@components/common/tooltip';
import styles from '@components/dashboard/period/DashBoardPeriod.module.scss';
import useMountEffect from '@hooks/useMountEffect';
import { useQuery } from '@tanstack/react-query';
import { fetchMetrics, fetchMetricsObjects } from '@api/metrics';
import useIsMobile from '@hooks/useIsMobile';
import dashBoardStore, { GRAPH_DATA } from '@store/dashboard';
import { METRICS, METRICS_OBJECTIVES_DATA } from '@type/metrics';
import userStore from '@store/user';
import BottomSheep from '@components/common/bottomSheep';

const periodArr = ['반기', '분기'];
const halfPeriodArr = ['상반기', '하반기'];
const quarterPeriodArr = ['1분기', '2분기', '3분기', '4분기'];

const getOffsetTop = (element: any) => {
  let newElement = element;
  let offsetTop = 0;
  while (newElement) {
    offsetTop += newElement.offsetTop;
    newElement = newElement.offsetParent;
  }
  return offsetTop;
};

const DashBoardPeriod = () => {
  const { userToken } = userStore();
  const { isMobile } = useIsMobile();
  const { changeGraphData } = dashBoardStore();
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [period, setPeriod] = useState<string>(periodArr[0]);
  const [categorize, setCategorize] = useState<string>(halfPeriodArr[0]);
  const [obejectStatus, setObejectStatus] = useState(false); // true: 달성완료? false: 달성중
  const [keyResultPercent, setKeyResultPercent] = useState(0);
  const [initiativePercent, setInitiativePercent] = useState(0);
  const [leftTimes, setLeftTimes] = useState<string>();
  const [periodModal, setPeriodModal] = useState({
    type: '',
    show: false,
  });
  const periodRef = useRef<HTMLDivElement | null>(null);
  // const periodChildRef = useRef<HTMLDivElement | null>(null);
  const deadline = `December, 31, ${new Date().getFullYear()}`;

  let metricsNumber = 1;

  const { refetch } = useQuery<METRICS[]>(
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

  const { isLoading } = useQuery<METRICS_OBJECTIVES_DATA[]>(
    ['objectives'],
    fetchMetricsObjects,
    {
      enabled: !!userToken,
      initialData: [],
      onSuccess: (data: METRICS_OBJECTIVES_DATA[]) => {
        const objectivesData = data.reduce(
          (acc, cur: METRICS_OBJECTIVES_DATA) => {
            return {
              ...acc,
              keyResult: acc.keyResult + cur.keyResultPercent,
              initiative: acc.initiative + cur.initiativePercent,
              achievement: cur.achievement ? true : false,
            };
          },
          { keyResult: 0, initiative: 0, achievement: false },
        );

        if (objectivesData.keyResult > 0) {
          setKeyResultPercent(
            Math.floor(objectivesData.keyResult / data.length),
          );
        }
        if (objectivesData.initiative > 0) {
          setInitiativePercent(
            Math.floor(objectivesData.initiative / data.length),
          );
        }

        setObejectStatus(objectivesData.achievement);
      },
    },
  );

  const getTime = useCallback(() => {
    const time = Date.parse(deadline) - Date.now();

    setLeftTimes(
      `${Math.floor(time / (1000 * 60 * 60 * 24))}일 ${Math.floor(
        (time / (1000 * 60 * 60)) % 24,
      )}시간 ${Math.floor((time / 1000 / 60) % 60)}분 남았어요`,
    );
  }, [leftTimes]);

  const handleChangeCategorize = useCallback(
    (e: string) => {
      setCategorize(e);

      if (e === '상반기' || e === '1분기') metricsNumber = 1;
      else if (e === '하반기' || e === '2분기') metricsNumber = 2;
      else if (e === '3분기') metricsNumber = 3;
      else if (e === '4분기') metricsNumber = 4;

      refetch();
    },
    [categorize],
  );

  useMountEffect(() => {
    setCategorize(period === '반기' ? halfPeriodArr[0] : quarterPeriodArr[0]);
    refetch();

    return () => {};
  }, [period]);

  useEffect(() => {
    const interval = setInterval(getTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (elem: any) => {
    if (window.scrollY > elem + 36) {
      periodRef.current?.classList.add('fixed');
      // if (headerElem) headerElem.style.position = 'absolute';
      // periodRef.current?.classList.add('fix');
      // periodChildRef.current?.classList.add('fixed');
    } else {
      // if (headerElem) headerElem.style.position = 'fixed';
      // document.getElementById('header').style.position = 'relative';
      periodRef.current?.classList.remove('fixed');
      // periodChildRef.current?.classList.remove('fixed');
    }
  };

  useEffect(() => {
    const elem = getOffsetTop(periodRef.current);
    const timer = setInterval(() => {
      window.addEventListener('scroll', () => handleScroll(elem), {
        capture: true,
      });
    }, 100);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.periodContainer} ref={periodRef}>
          {isMobile ? (
            <div className={styles.periodCategory}>
              <button
                type="button"
                onClick={() => {
                  setPeriodModal({ type: 'period', show: true });
                }}
              >
                {period}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPeriodModal({ type: 'quarter', show: true });
                }}
              >
                {categorize}
              </button>
            </div>
          ) : (
            <div className={styles.periodCategory}>
              <label>
                <span className={styles.title}>기간</span>
                <Select
                  value={period}
                  setValue={setPeriod}
                  options={periodArr}
                />
              </label>
              <label>
                <span className={styles.title}>분류</span>
                <Select
                  value={categorize}
                  options={period === '반기' ? halfPeriodArr : quarterPeriodArr}
                  onChange={(e) => handleChangeCategorize(e)}
                />
              </label>
            </div>
          )}
          {!isMobile && (
            <div className={styles.periodOfTime}>
              <button
                type="button"
                onClick={() => setTooltipOpen(!tooltipOpen)}
              >
                <AutoHeightImage
                  src="/images/time-clock.png"
                  alt="검색"
                  width={20}
                  height={20}
                />
                <ToolTip
                  text={`목표 기간 : ${new Date().getFullYear()}.01.01 ~ ${new Date().getFullYear()}.12.31`}
                  open={tooltipOpen}
                  clasName={styles.tooltip}
                />
              </button>
              {leftTimes}
            </div>
          )}
        </div>
        <ul className={styles.categoryContainer}>
          <li className={styles.objectives}>
            <div className={styles.icon}>
              <AutoHeightImage
                src="/images/trophy.png"
                alt="목표"
                width={24}
                height={24}
              />
            </div>
            <div>
              <strong>{obejectStatus ? '달성완료' : '달성중'}</strong>
              <p>목표</p>
            </div>
            <div className={styles.progress}>
              <span style={{ width: `${obejectStatus ? 100 : 0}%` }} />
            </div>
          </li>
          <li className={styles.keyResult}>
            <div className={styles.icon}>
              <AutoHeightImage
                src="/images/flag.png"
                alt="결과"
                width={24}
                height={24}
              />
            </div>
            <div>
              <strong>{keyResultPercent}%</strong>
              <p>핵심 지표</p>
            </div>
            <div className={styles.progress}>
              <span style={{ width: `${keyResultPercent}%` }} />
            </div>
          </li>
          <li className={styles.initiatives}>
            <div className={styles.icon}>
              <AutoHeightImage
                src="/images/todo.png"
                alt="계획"
                width={24}
                height={24}
              />
            </div>
            <div>
              <strong>{initiativePercent}%</strong>
              <p>주요 행동</p>
            </div>
            <div className={styles.progress}>
              <span style={{ width: `${initiativePercent}%` }} />
            </div>
          </li>
        </ul>
      </div>
      {isMobile && (
        <BottomSheep
          title="기간"
          onClose={() => setPeriodModal({ type: '', show: false })}
          open={periodModal.show}
        >
          {(periodModal.type === 'period'
            ? periodArr
            : period === '반기'
            ? halfPeriodArr
            : quarterPeriodArr
          )?.map((v, i) => (
            <button
              type="button"
              key={i}
              className={cn('select-btn', {
                ['selected']:
                  periodModal.type === 'period'
                    ? period === v
                    : categorize === v,
              })}
              onClick={() => {
                if (periodModal.type === 'period') setPeriod(v);
                else handleChangeCategorize(v);

                setPeriodModal({ type: '', show: false });
              }}
            >
              {v}
              {periodModal.type === 'period' && (
                <span className={styles.periodDescription}>
                  {v === '분기' ? ' (3개월 단위)' : ' (6개월 단위)'}
                </span>
              )}
            </button>
          ))}
        </BottomSheep>
      )}
    </>
  );
};

export default DashBoardPeriod;
