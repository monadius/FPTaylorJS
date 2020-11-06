import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
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

function createData(foo, dom, samples = 500) {
  const [a, b] = dom || [0, 1];
  const h = (b - a) / Math.max(1, samples);
  const data = Array(samples);
  for (let i = 0; i < samples; i++) {
    const x = a + h * i;
    const y = foo(x);
    data[i] = {x, y};
  }
  return data;
}

function addInfo(info, row, field, name) {
  if (row[field]) {
    const v = row[field];
    const text = typeof v === 'string' ? v :
                 typeof v === 'number' ? v.toString() :
                 Array.isArray(v) ? `[${v.map(x => x.toString()).join(', ')}]` :
                 v.toString();
    info.push(<tr key={ field } className="bg-white"><td>{ name }</td><td>{ text }</td></tr>);
  }
  return info;
}

const ResultRow = ({row, update, data}) => {
  const show = data && data.show;
  const chartData = (data && data.data) || [];

  const handleShow = () => {
    const newData = { show: !show };
    if (newData.show && row.absErrorModel && row.absErrorModel.expr) {
      if (!chartData || !chartData.length) {
        const f = eval(`(${row.absErrorModel.expr})`);
        newData.data = createData(f, row.absErrorModel.dom, 500);
      }
    }
    update(row, newData);
  };

  const info = [
    ['absErrorExactStr', 'Abs Error'],
    ['absErrorApproxStr', 'Abs Error (approx)'],
    ['relErrorExactStr', 'Rel Error'],
    ['relErrorApproxStr', 'Rel Error (approx)'],
    ['ulpErrorExactStr', 'ULP Error'],
    ['ulpErrorApproxStr', 'ULP Error (approx)'],
    ['realBounds', 'Bounds (without rounding)']
  ].reduce((info, [field, name]) => addInfo(info, row, field, name), []);

  return (
    <>
      <Table borderless hover={false} size="sm" style={{width: "auto"}}>
        <tbody>
          { info }
        </tbody>
      </Table>
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