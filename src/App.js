import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from './Header';
import OutputPane from './OutputPane'
import InputPane from './InputPane'

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
      worker.postMessage({input, config});
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
        results: [...state.results, ...e.data]
      }));
    }
    else {
      this.setState(state => ({outputLog: [...state.outputLog, e.data]}));
    }
  }

  onWorkerError() {
    this.stopWorker();
  }

  render() {
    const headerHeight = this.props.headerHeight;
    const state = this.state;
    return (
      <div className="h-100">
        <Header height={headerHeight}/>
        <Container as="main" fluid style={{height: `calc(100% - ${headerHeight})`}}>
          <Row className="h-100 p-0">
            <Col as="section" sm={12} md={6} className="order-2 order-md-1 h-100 bg-light py-3" >
              <OutputPane output={this.state.outputLog} results={this.state.results}/>
            </Col>
            <Col as="section" sm={12} md={6} className="order-1 order-md-2 h-100 bg-light py-3">
              <InputPane isRunning={state.worker !== null}
                         onClear={this.onClearResults}
                         onRunOrStop={this.onRunFPTaylor}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
