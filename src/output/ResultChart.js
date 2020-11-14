import React from 'react';
import { LineChart, XAxis, YAxis, Line, Tooltip, Brush, ResponsiveContainer } from 'recharts';

const fmtX = x => x.toPrecision(2);

const Chart = ({title, data}) => {
  return (
    <ResponsiveContainer width="100%" aspect={5/3}>
      <LineChart data={ data }
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="x" scale="linear" tickFormatter={ fmtX }/>
        <YAxis scale="linear" tickFormatter={ fmtX }/>
        {/* <Legend verticalAlign="top"/> */}
        <Line name={title} type="monotone" dataKey="y" strokeWidth={2} dot={false} isAnimationActive={false}/>
        <Tooltip/>
        <Brush leaveTimeOut={200} dataKey="x" height={30} tickFormatter = { fmtX }/>
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;