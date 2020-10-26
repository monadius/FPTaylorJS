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
      outputLog: ["Log1"],
      results: []
    };
  }

  onRunFPTaylor = (input, config) => {
    this.setState(state => ({outputLog: [...state.outputLog, "Log"]}));
  }

  render() {
    const headerHeight = this.props.headerHeight;
    return (
      <div className="h-100">
        <Header height={headerHeight}/>
        <Container as="main" fluid style={{height: `calc(100% - ${headerHeight})`}}>
          <Row className="h-100 p-0">
            <Col as="section" sm={12} md={6} className="order-2 order-md-1 h-100 bg-light py-3" >
              <OutputPane output={this.state.outputLog} results={this.state.results}/>
            </Col>
            <Col as="section" sm={12} md={6} className="order-1 order-md-2 h-100 bg-light py-3">
              <InputPane onRunFPTaylor={this.onRunFPTaylor}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
