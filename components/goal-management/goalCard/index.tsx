import { fetchOkrObjectives } from '@api/objectives';
import goalManagementStore from '@store/goal-management';
import { useQuery } from '@tanstack/react-query';
import { OKY_KEY_RESULT_TYPE } from '@type/okr';
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import GoalCardItem from './goalCardItem';
import styles from './GoalCardList.module.scss';

// https://react-slick.neostack.com/docs/example/multiple-items
const GoalCardList = ({ cards }: { cards: any }) => {
  const { currentYear } = goalManagementStore();
  const { data, refetch } = useQuery(
    ['okr'],
    () => fetchOkrObjectives(Number(currentYear)),
    {
      suspense: true,
      useErrorBoundary: true,
      enabled: currentYear ? true : false,
    },
  );

  useEffect(() => {
    refetch();
  }, [currentYear]);

  console.log(cards);

  const settings = {
    className: 'slider variable-width',
    dots: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  return (
    <div className={styles.root}>
      {cards?.length > 0 && (
        <Slider {...settings}>
          {cards.map((card: OKY_KEY_RESULT_TYPE) => (
            <GoalCardItem key={card.id} data={card} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default GoalCardList;
