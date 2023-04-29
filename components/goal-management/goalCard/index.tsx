import { fetchOkrObjectives } from '@api/objectives';
import useMountEffect from '@hooks/useMountEffect';
import goalManagementStore from '@store/goal-management';
import { useQuery } from '@tanstack/react-query';
import { OKY_KEY_RESULT_TYPE } from '@type/okr';
import React, { useEffect, useRef, useState } from 'react';
// import Slider from 'react-slick';
import GoalCardItem from './goalCardItem';
import styles from './GoalCardList.module.scss';

// https://react-slick.neostack.com/docs/example/multiple-items
const GoalCardList = ({ cards }: { cards: any }) => {
  // const [nav1, setNav1] = useState<Slider | null | undefined>();
  // const [nav2, setNav2] = useState<Slider | null | undefined>();
  const { currentYear } = goalManagementStore();
  const { data, refetch } = useQuery(
    ['okr_objectives'],
    () => fetchOkrObjectives(Number(currentYear)),
    {
      suspense: true,
      useErrorBoundary: true,
      enabled: currentYear ? true : false,
    },
  );

  useMountEffect(() => {
    refetch();
  }, [currentYear]);

  console.log(cards, data);

  // const settings = {
  //   className: 'slider variable-width',
  //   dots: false,
  //   infinite: false,
  //   centerMode: false,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   variableWidth: true,
  // };

  // const settings = {
  //   customPaging: function (i) {
  //     return <div>{i}</div>;
  //   },
  //   dots: true,
  //   dotsClass: 'slick-dots slick-thumb',
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  return (
    <div className={styles.root}>
      {/* <Slider
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        // slidesToShow={3}
        variableWidth={true}
        infinite={false}
        swipeToSlide={true}
        focusOnSelect={true}
        slidesToScroll={1}
        draggable={false}
      >
        {cards.map((card: OKY_KEY_RESULT_TYPE) => (
          <GoalCardItem key={card.id} data={card} />
        ))}
      </Slider>
      <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
        
      </Slider> */}
      <div className={styles.lists}>
        {cards.map((card: OKY_KEY_RESULT_TYPE) => (
          <GoalCardItem key={card.id} data={card} />
        ))}
      </div>
    </div>
  );
};

export default GoalCardList;
