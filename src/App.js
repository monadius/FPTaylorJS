import React, { useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Split from 'react-split';

import Header from './Header';
import OutputPane from './output/OutputPane'
import InputPane from './input/InputPane'

import { default_config } from './default_config';

const transformResult = (() => {
  let id = 0;
  return (data) => ({
    id: id++,
    ...data,
    elapsedTime: data.elapsedTime.toFixed(2),
    absError: data.absErrorExactStr || data.absErrorApproxStr || '-',
    relError: data.relErrorExactStr || data.relErrorApproxStr || '-',
    ulpError: data.ulpErrorExactStr || data.ulpErrorApproxStr || '-',
    bounds: data.realBounds
  });
})();

const transformOutput = (() => {
  let id = 0;
  return (obj) => ({...obj, id: id++});
})();

function createGutter(index, dir) {
  const gutter = document.createElement('div');
  gutter.className = `order-2 my-3 d-none d-md-block gutter gutter-${dir}`;
  return gutter;
}

const App = (props) => {
  const [results, setResults] = useState([]);
  const [output, setOutput] = useState([]);
  const [worker, setWorker] = useState(null);

  const onRunFPTaylor = useCallback((input, config) => {
    const stopWorker = (worker) => {
      if (worker) {
        worker.terminate();
        setWorker(null);
      }
    };

    const onWorkerMessage = (e) => {
      if (Array.isArray(e.data)) {
        setWorker(null);
        setResults(results => [...results, ...e.data.map(transformResult)]);
      }
      else {
        setOutput(output => [...output, transformOutput(e.data)]);
      }
    };

    if (worker) {
      stopWorker(worker);
    }
    else {
      const worker = new Worker('fptaylor.js');
      worker.onmessage = onWorkerMessage;
      worker.onerror = stopWorker.bind(null, worker);
      worker.postMessage({input, config, defaultcfg: default_config});
      setWorker(worker);
      setOutput([]);
    }
  }, [worker]);

  const onClearResults = useCallback(() => {
    setResults([]);
    setOutput([]);
  }, []);

  const headerHeight = props.headerHeight;
  return (
    <div className="h-100">
      <Header height={headerHeight}/>
      <Container as="main" fluid className="p-0" style={{height: `calc(100% - ${headerHeight})`}}>
      <Split
        sizes={[50, 50]}
        minSize={300}
        expandToMin={false}
        gutterSize={6}
        gutterAlign="center"
        gutter={createGutter}
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        className="d-flex flex-wrap h-100 bg-light"
      >
        <section className="order-3 order-md-1 h-100 py-3 col-12 col-md-auto px-3 pr-md-1 bg-light" >
          <OutputPane output={output} results={results}/>
        </section>
        <section className="order-1 order-md-3 h-100 py-3 col-12 col-md-auto px-3 pl-md-1 bg-light">
          <InputPane isRunning={worker !== null}
                     onClear={onClearResults}
                     onRunOrStop={onRunFPTaylor}/>
        </section>
      </Split>
        {/* <Row className="h-100 p-0">
          <Col as="section" sm={12} md={6} className="order-2 order-md-1 h-100 bg-light py-3" >
            <OutputPane output={this.state.outputLog} results={this.state.results}/>
          </Col>
          <Col as="section" sm={12} md={6} className="order-1 order-md-2 h-100 bg-light py-3">
            <InputPane isRunning={state.worker !== null}
                       onClear={this.onClearResults}
                       onRunOrStop={this.onRunFPTaylor}/>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
}

export default App;
