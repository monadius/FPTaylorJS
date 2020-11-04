import React from 'react';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import Output from './Output';
import Results from './Results';

class OutputPane extends React.PureComponent {
  render() {
    return (
      <Card className="h-100">
        <Tab.Container defaultActiveKey="results" transition={false}>
          <Card.Header>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="output" href="#output">Output</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="results" href="#results">Results</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body className="p-0">
            <Tab.Content className="h-100">
              <Tab.Pane eventKey="output" className="h-100">
                <Output data={ this.props.output }/>
              </Tab.Pane>
              <Tab.Pane eventKey="results" className="h-100 overflow-auto">
                <Results data={ this.props.results }
                  initHidden={{'relError': true, 'ulpError': true}}
                />
              </Tab.Pane>
            </Tab.Content>
          </Card.Body>
        </Tab.Container>
      </Card>
    );
  }
}

export default OutputPane;