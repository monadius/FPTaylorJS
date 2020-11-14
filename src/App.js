import React from 'react';
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outputLog: [],
      results: [],
      worker: null
    };
  }

  stopWorker = () => {
    if (this.state.worker) {
      this.state.worker.terminate();
      this.setState(() => ({worker: null}));
    }
  }

  onRunFPTaylor = (input, config) => {
    if (this.state.worker) {
      this.stopWorker();
    }
    else {
      const worker = new Worker('fptaylor.js');
      worker.onmessage = this.onWorkerMessage.bind(this);
      worker.onerror = this.onWorkerError.bind(this);
      worker.postMessage({input, config, defaultcfg: default_config});
      this.setState(() => ({worker: worker, outputLog: []}));
    }
  }

  onClearResults = () => {
    this.setState(() => ({outputLog: [], results: []}));
  }

  onWorkerMessage(e) {
    if (Array.isArray(e.data)) {
      this.setState(state => ({
        worker: null, 
        results: [...state.results, ...e.data.map(transformResult)]
      }));
    }
    else {
      this.setState(state => ({outputLog: [...state.outputLog, transformOutput(e.data)]}));
    }
  }

  onWorkerError() {
    this.stopWorker();
  }

  createGutter = (index, dir) => {
    const gutter = document.createElement('div');
    gutter.className = `order-2 my-3 d-none d-md-block gutter gutter-${dir}`;
    return gutter;
  }

  render() {
    const headerHeight = this.props.headerHeight;
    const state = this.state;
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
          gutter={this.createGutter}
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
          className="d-flex flex-wrap h-100 bg-light"
        >
          <section className="order-3 order-md-1 h-100 py-3 col-12 col-md-auto px-3 pr-md-1 bg-light" >
            <OutputPane output={this.state.outputLog} results={this.state.results}/>
          </section>
          <section className="order-1 order-md-3 h-100 py-3 col-12 col-md-auto px-3 pl-md-1 bg-light">
            <InputPane isRunning={state.worker !== null}
                       onClear={this.onClearResults}
                       onRunOrStop={this.onRunFPTaylor}/>
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
}

export default App;
