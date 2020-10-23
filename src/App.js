import React, { StrictMode } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import Header from './Header';
import OutputPane from './OutputPane'

function App(props) {
  return (
    <div className="h-100">
      <Header height={props.headerHeight}/>
      <Container fluid style={{height: `calc(100% - ${props.headerHeight})`}}>
        <Row className="h-100 p-0">
          <Col sm={12} md={6} className="order-2 order-md-1 h-100 bg-light py-3" >
            <OutputPane/>
          </Col>
          <Col sm={12} md={6} className="order-1 order-md-2 h-100 bg-light py-3">2 of 2</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
