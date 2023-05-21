import cn from 'classnames';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { OKR_OBJECTIVES_TYPE } from '@type/okr';
import React from 'react';
import GoalCardItem from './goalCardItem';
import styles from './GoalCardList.module.scss';
import AutoHeightImage from '@components/common/image';

const GoalCardList = ({ cards }: { cards: OKR_OBJECTIVES_TYPE[] }) => {
  const option = {
    autoWidth: true,
    pagination: false,
    gap: 15,
    omitEnd: true,
    focus: 0,
  };

  return (
    <div className={styles.root}>
      {cards?.length > 0 && (
        <>
          <Splide hasTrack={false} options={option}>
            <div className={cn('splide__arrows', styles.arrows)}>
              <button className={cn('splide__arrow--prev', styles.prev)}>
                <AutoHeightImage
                  src="/images/prev-arrow.png"
                  alt="prev"
                  width={24}
                  height={24}
                />
              </button>
              <button className={cn('splide__arrow--next', styles.next)}>
                <AutoHeightImage
                  src="/images/next-arrow.png"
                  alt="next"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <SplideTrack>
              {cards.map((card: OKR_OBJECTIVES_TYPE) => (
                <SplideSlide key={card.id}>
                  <GoalCardItem data={card} />
                </SplideSlide>
              ))}
            </SplideTrack>
          </Splide>
        </>
      )}
    </div>
  );
};

export default GoalCardList;
