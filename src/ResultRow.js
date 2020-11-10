import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Chart from './ResultChart';

import Func from './fptaylor_functions';

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

const infoParams = [
  ['absErrorExactStr', 'Absolute Error', 'absErrorModel'],
  ['absErrorApproxStr', 'Absolute Error (approx)'],
  ['relErrorExactStr', 'Relative Error', 'relErrorModel'],
  ['relErrorApproxStr', 'Relative Error (approx)'],
  ['ulpErrorExactStr', 'ULP Error'],
  ['ulpErrorApproxStr', 'ULP Error (approx)'],
  ['realBoundsStr', 'Bounds (without rounding)']
];

const ResultRow = ({row, update, data}) => {
  function handleShow(type, errModelField) {
    const newData = {...data};
    const show = newData[type + 'Show'] = !newData[type + 'Show'];
    const chartData = newData[type + 'ChartData'];
    if (show && row[errModelField] && row[errModelField].expr) {
      if (!chartData || !chartData.length) {
        const f = Function('M', `return (${row[errModelField].expr})`)(Func);
        newData[type + 'ChartData'] = createData(f, row[errModelField].dom, 500);
      }
    }
    update(row, newData);
  }

  const info = [];

  function addInfo(field, name, errModelField) {
    if (row[field]) {
      const v = row[field];
      const text = typeof v === 'string' ? v :
                   typeof v === 'number' ? v.toString() :
                   Array.isArray(v) ? `[${v.map(x => x.toString()).join(', ')}]` :
                   v.toString();
      if (text && text !== '[-inf, +inf]') {
        let plotButton = null;
        if (errModelField && row[errModelField]) {
          const type = errModelField.slice(0, 3);
          const handle = handleShow.bind(null, type, errModelField);
          const visible = (data || {})[type + 'Show'];
          plotButton = 
            <Button onClick={ handle } variant="success" className="py-0">
              { visible ? "Hide" : "Plot" }
            </Button>;
        }
        info.push(
          <tr key={ field } className="bg-white">
            <td>{ name } { plotButton }</td>
            <td>{ text }</td>
          </tr>);
      }
    }
    return info;
  }

  infoParams.forEach(args => addInfo(...args));

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
      { data && data.absShow && <Chart title="Absolute Error" data={ data.absChartData }/> }
      { data && data.relShow && <Chart title="Relative Error" data={ data.relChartData }/> }
    </>
  );
}

export default ResultRow;