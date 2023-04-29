import AutoHeightImage from '@components/common/image';
import { OKY_KEY_RESULT_TYPE } from '@type/okr';
import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import styles from './goalCardItem.module.scss';

const GoalCardItem = ({ data }: { data: OKY_KEY_RESULT_TYPE }) => {
  const [title, setTitle] = useState(data.title);
  const [disabledTitle, setDisabledTitle] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const titleRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const btnRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  // console.log(data);
  // fetchOkrObjectives

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

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <span className={styles.tag}>달성중</span>
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
            <button type="button">삭제</button>
          </div>
        )}
      </div>
      <textarea
        ref={titleRef}
        className={styles.title}
        value={title}
        // onKeyPress={(e) => {
        //   if (e.key === 'Enter') {
        //     setDisabledTitle(true);
        //   }
        // }}
        rows={2}
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
      <p>
        {data.openDate} ~ {data.dueDate}
      </p>
      <div className={styles.bottom}></div>
    </div>
  );
};

export default GoalCardItem;
