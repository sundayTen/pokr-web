import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
const COLORS = ['#FBBE63', '#F3F4F5'];
const PieProgress = ({ ratio }: { ratio: number }) => {
  const data = [
    { name: 'current', value: ratio },
    {
      name: 'total',
      value: 1 - ratio,
    },
  ];
  return (
    <PieChart width={24} height={24}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={6}
        outerRadius={10}
        dataKey="value"
        animationBegin={0}
        fill={COLORS[1]}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PieProgress;
