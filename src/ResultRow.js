import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Chart from './ResultChart';

function interval(a, b) {
  return (a + b) / 2;
}

function floor_power2(x) {
  if (x < 0) return -floor_power2(-x);
  if (x === 0 || isNaN(x) || !isFinite(x)) return x;
  let e = Math.max(Math.floor(Math.log2(x)) + 1, -1023);
  x *= 2 ** (-e);
  for (; x < 0.5; x *= 2, e -= 1);
  for (; x >= 1; x *= 0.5, e += 1);
  return x === 0.5 ? 2 ** (e - 2) : 2 ** (e - 1);
}

function createData(foo, dom, samples) {
  const [a, b] = dom;
  const h = (b - a) / Math.max(1, samples);
  const data = Array(samples);
  for (let i = 0; i < samples; i++) {
    const x = a + h * i;
    const y = foo(x);
    data[i] = {x, y};
  }
  return data;
}

const ResultRow = ({row, update, data}) => {
  const show = data && data.show;
  const chartData = (data && data.data) || [];
  // const [show, changeShow] = useState(false);
  // const [data, updateData] = useState([]);

  const handleShow = () => {
    // changeShow(!show);
    const newData = { show: !show };
    if (newData.show && row.absErrorModel && row.absErrorModel.expr) {
      if (!chartData || !chartData.length) {
        const f = eval(`(${row.absErrorModel.expr})`);
        newData.data = createData(f, row.absErrorModel.dom, 500);
      }
    }
    update(row, newData);
  };

  return (
    <>
      <p>Bounds: [{row.bounds[0]}, {row.bounds[1]}]</p>
      {/* <pre style={{width: 500}} className="overflow-auto">
        { row.absErrorModel.expr }
        { row.absErrorModel.dom.toString() }
      </pre> */}
      <Button onClick={handleShow}>Plot</Button>
      { show && <Chart data={ chartData }/> }
    </>
  );
}

export default ResultRow;