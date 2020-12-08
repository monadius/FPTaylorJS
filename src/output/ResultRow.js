import React from 'react';
import { Button, Table } from 'react-bootstrap';
import Chart from './ResultChart';

import Func from '../fptaylor-functions';

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
  ['realBoundsStr', 'Bounds (without rounding)']
];

const fieldToText = v =>
  typeof v === 'string' ? v :
  typeof v === 'number' ? v.toString() :
  Array.isArray(v)      ? `[${v.map(x => x.toString()).join(', ')}]` :
  v.toString();

const ResultRow = ({row, update, data}) => {
  function handleShow(type, errModel) {
    const newData = {...data};
    const show = newData[type + 'Show'] = !newData[type + 'Show'];
    const chartData = newData[type + 'ChartData'];
    if (show && errModel && errModel.expr) {
      if (!chartData || !chartData.length) {
        /* eslint-disable no-new-func */
        const f = Function('M', `return (${errModel.expr})`)(Func);
        newData[type + 'ChartData'] = createData(f, errModel.dom, 500);
      }
    }
    update(row, newData);
  }

  const info = [];

  function addInfo(field, name) {
    if (row[field]) {
      const v = row[field];
      const text = fieldToText(v);
      if (text && text !== '[-inf, +inf]') {
        info.push(
          <tr key={ field } className="bg-white">
            <td>{ name }</td>
            <td>{ text }</td>
          </tr>);
      }
    }
    return info;
  }

  function addErrorInfo(error) {
    const v = error.errorStr;
    if (v) {
      const text = fieldToText(v);
      let plotButton = null;
      if (error.errorModel) {
        const type = error.errorName.slice(0, 3).toLowerCase();
        const handle = handleShow.bind(null, type, error.errorModel);
        const visible = (data || {})[type + 'Show'];
        plotButton = 
          <Button onClick={ handle } variant="success" className="py-0">
            { visible ? "Hide" : "Plot" }
          </Button>;
      }
      info.push(
        <tr key={ error.errorName } className="bg-white">
          <td>{ error.errorName } { plotButton }</td>
          <td>{ text }</td>
        </tr>);
    }
    return info;
  }

  infoParams.forEach(args => addInfo(...args));
  row.errors.forEach(addErrorInfo);

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
      { data && data.ulpShow && <Chart title="ULP Error" data={ data.ulpChartData }/> }
    </>
  );
}

export default ResultRow;