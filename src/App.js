import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from './Header';
import OutputPane from './OutputPane'
import InputPane from './InputPane'

function App(props) {
  return (
    <div className="h-100">
      <Header height={props.headerHeight}/>
      <Container as="main" fluid style={{height: `calc(100% - ${props.headerHeight})`}}>
        <Row className="h-100 p-0">
          <Col as="section" sm={12} md={6} className="order-2 order-md-1 h-100 bg-light py-3" >
            <OutputPane/>
          </Col>
          <Col as="section" sm={12} md={6} className="order-1 order-md-2 h-100 bg-light py-3">
            <InputPane/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
