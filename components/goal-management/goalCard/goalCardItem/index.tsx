import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { OKR_OBJECTIVES_TYPE } from '@type/okr';
import {
  copyObjectives,
  deleteObjectives,
  editObjectives,
} from '@api/objectives';
import AutoHeightImage from '@components/common/AutoHeightImage';
import cn from 'classnames';
import dayjs from 'dayjs';
import styles from './goalCardItem.module.scss';
import goalManagementStore from '@store/goal-management';
import { useOverlay } from '@toss/use-overlay';
import Alert from '@components/common/alert';

const GoalCardItem = ({ data }: { data: OKR_OBJECTIVES_TYPE }) => {
  const { objectivesList, changeObjectivesList } = goalManagementStore();
  const [title, setTitle] = useState<string>(data.title);
  const [showMore, setShowMore] = useState(false);
  // const [errorText, setErrorText] = useState('');
  const [edit, setEdit] = useState(false);
  const titleRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const btnRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const today = dayjs().format('YYYY-MM-DD');
  const lastDay = dayjs().format('YYYY.12.31');
  const { open } = useOverlay();
  const onOpenAlert = (errorText: string, fn: () => void) => {
    open(({ isOpen, exit, close }) => {
      return (
        <Alert
          content={errorText}
          confirmButtonPressed={() => {
            // fn();
            close();
          }}
        />
      );
    });
  };

  const { mutate: editObjectiveMutate } = useMutation(editObjectives, {
    onError: (err) => {
      if (err) setTitle(data.title);
    },
  });

  const { mutate: copyMutate } = useMutation(copyObjectives, {
    onError: (err) => {
      console.log(err, 'copy error!!!');
    },
    onSuccess: (res) => {
      if (res) {
        const { title, year, achievement, keyResultCount, initiativeCount } =
          data;
        const item = {
          id: res.id,
          title,
          year,
          achievement,
          keyResultCount,
          initiativeCount,
          createdAt: dayjs().format('YYYY-MM-DD'),
          updatedAt: dayjs().format('YYYY-MM-DD'),
        };
        changeObjectivesList([...objectivesList, item]);
      }
    },
  });

  const { mutate: deleteMutate } = useMutation(deleteObjectives, {
    onError: (err) => {
      console.log(err, 'deleteMutate error!!!');
    },
    onSuccess: () => {
      changeObjectivesList(
        objectivesList.filter((list) => list.id !== data.id),
      );
    },
  });

  const handleTitleAlert = () => {
    onOpenAlert('목표명은 200자까지 입력 가능합니다.', () =>
      titleRef.current.focus(),
    );
  };

  const handleSaveTitle = useCallback(() => {
    if (title.length === 0) {
      titleRef.current.focus();
    } else if (title.length > 200) {
      titleRef.current.focus();
    } else {
      const { id, year, achievement } = data;

      editObjectiveMutate({
        id: id,
        title: title,
        year: year,
        achievement: achievement,
      });
      titleRef.current.scrollTo({ top: 0 });

      setEdit(false);
    }
  }, [title, edit]);

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

  useEffect(() => {
    if (edit) titleRef.current.focus();
  }, [edit]);

  if (!data) return <React.Fragment />;

  return (
    <div
      className={cn(styles.root, { [styles.selected]: data.id === 5 })}
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
            setEdit(true);
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
          placeholder="목표를 입력해주세요."
          ref={titleRef}
          className={cn(styles.title, { [styles.normal]: !edit })}
          value={title}
          rows={2}
          onChange={(e) => {
            if (e.target.value.length <= 200) setTitle(e.target.value);
          }}
          onKeyDown={(e) => {
            let numberOfLines =
              ((e.target as HTMLInputElement).value.match(/\n/g) || []).length +
              1;

            if (e.which === 13 && numberOfLines >= 2) {
              return false;
            }
          }}
          disabled={!edit}
          onBlur={handleSaveTitle}
        />
      )}
      <p className={styles.period}>
        {dayjs(data.createdAt).format('YYYY.MM.DD')} ~ {lastDay}
      </p>
      <div className={styles.bottom}>
        <div>
          <AutoHeightImage
            src="/images/card/flag.png"
            alt=""
            width="24"
            height="24"
          />
          {data.keyResultCount}
        </div>
        <div className={styles.initiative}>
          <AutoHeightImage
            src="/images/card/check.png"
            alt=""
            width="24"
            height="24"
          />
          {data.initiativeCount}
        </div>
      </div>
    </div>
  );
};

export default GoalCardItem;
