import React from 'react';
import { Card, Nav } from 'react-bootstrap';
import { useRouteMatch, Link } from 'react-router-dom';

import Show from '../Show';
import Output from './Output';
import Results from './Results';

const OutputPane = React.memo((props) => {
  const showResults = !!useRouteMatch('/results');

  return (
    <Card className="h-100">
      <Card.Header>
        <Nav variant="tabs" activeKey={showResults ? "results" : "output"}>
          <Nav.Item>
            <Nav.Link as={Link}
              to="/output"
              replace={true}
              eventKey="output"
            >
              Output
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link}
              to="/results"
              replace={true}
              eventKey="results"
            >
              Results
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body className="p-0">
        <Show show={!showResults} className="h-100">
          <Output data={ props.output }/>
        </Show>
        <Show show={showResults} className="h-100 overflow-auto">
          <Results data={ props.results }
            initHidden={{'relError': true, 'ulpError': true}}
          />
        </Show>
      </Card.Body>
    </Card>
  );
});

export default OutputPane;