import React from 'react';
import styles from './PieChart.module.scss';
import cn from 'classnames';
const PieChart = () => {
  return (
    <div>
      <div className={styles.chartPieWrap}>
        <svg className={styles.chartPie} width="24" height="24">
          <circle
            className={cn(styles.pieCircle, styles.pie_circle1)}
            cx="12"
            cy="12"
            r="10"
          />
          <circle
            className={cn(styles.pieCircle, styles.pie_circle2)}
            cx="12"
            cy="12"
            r="10"
          />
          <circle
            className={cn(styles.pieCircle, styles.pie_bg)}
            cx="12"
            cy="12"
            r="10"
          />
        </svg>
      </div>
    </div>
  );
};

export default PieChart;
