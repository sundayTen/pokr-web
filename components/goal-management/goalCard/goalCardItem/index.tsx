import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { OKR_OBJECTIVES_TYPE } from '@type/okr';
import { copyObjectives, deleteObjectives } from '@api/objectives';
import AutoHeightImage from '@components/common/image';
import cn from 'classnames';
import dayjs from 'dayjs';
import styles from './goalCardItem.module.scss';

const GoalCardItem = ({ data }: { data: OKR_OBJECTIVES_TYPE }) => {
  const [title, setTitle] = useState(data.title);
  const [disabledTitle, setDisabledTitle] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const titleRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const btnRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const today = dayjs().format('YYYY-MM-DD');
  const lastDay = dayjs().format('YYYY.12.31');

  const { mutate: copyMutate } = useMutation(copyObjectives, {
    onError: (err) => {
      console.log(err, 'copy error!!!');
    },
    onSuccess: (res) => {
      if (res) {
        console.log('res', res!!!!);
      }
    },
  });

  const { mutate: deleteMutate } = useMutation(deleteObjectives, {
    onError: (err) => {
      console.log(err, 'copy error!!!');
    },
    onSuccess: (res) => {
      if (res) {
        console.log('res', res!!!!);
      }
    },
  });

  useEffect(() => {
    const handleCloseSelect = (e: React.BaseSyntheticEvent | MouseEvent) => {
      if (showMore && (!btnRef.current || !btnRef.current.contains(e.target))) {
        setShowMore(false);
      }
    };

    window.addEventListener('click', handleCloseSelect);

    return () => {
      window.removeEventListener('click', handleCloseSelect);
    };
  }, [showMore]);

  if (!data) return <div />;

  return (
    <div
      className={cn(styles.root)}
      onClick={() => {
        // keyResults
      }}
    >
      <div className={styles.top}>
        <span
          className={cn(styles.tag, {
            // [styles.progress]: 달성중
            // [styles.expected]: 달성예정
            // [styles.expiration]: 기간만료
            // [styles.done]: 달성완료
          })}
        >
          달성중
        </span>
        <button
          type="button"
          className={styles.editButton}
          onClick={() => {
            setDisabledTitle(false);
            titleRef.current.focus();
          }}
        >
          <AutoHeightImage
            src="/images/card/edit.png"
            alt=""
            width="24"
            height="24"
          />
        </button>
        <button
          type="button"
          className={styles.moreButton}
          onClick={() => setShowMore(!showMore)}
          ref={btnRef}
        >
          <AutoHeightImage
            src={`/images/more/more_${showMore ? 'checked' : 'unchecked'}.png`}
            alt=""
            width="24"
            height="24"
          />
        </button>
        {showMore && (
          <div className={styles.moreInner}>
            <button type="button" onClick={() => copyMutate(data.id)}>
              복제
            </button>
            <button type="button" onClick={() => deleteMutate(data.id)}>
              삭제
            </button>
          </div>
        )}
      </div>
      {data.title && (
        <textarea
          ref={titleRef}
          className={styles.title}
          value={title}
          // onKeyPress={(e) => {
          //   if (e.key === 'Enter') {
          //     setDisabledTitle(true);
          //   }
          // }}
          // rows={2}
          onChange={(e) => {
            const str = e.target.value?.split('\n');
            if (str?.length <= 2) {
              setTitle(e.target.value);
            }
            // setTitle(true);
          }}
          onKeyDown={(e) => {
            let numberOfLines =
              ((e.target as HTMLInputElement).value.match(/\n/g) || []).length +
              1;

            if (e.which === 13 && numberOfLines >= 2) {
              return false;
            }
          }}
          disabled={disabledTitle}
        />
      )}
      <p className={styles.period}>
        {dayjs(data.createdAt).format('YYYY.MM.DD')} ~ {lastDay}
      </p>
      <div className={styles.bottom}></div>
    </div>
  );
};

export default GoalCardItem;
