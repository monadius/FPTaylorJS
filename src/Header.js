import React, { useCallback } from 'react';
import { Navbar, Modal, Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { useQuery } from './common/hooks';

const credits = [
  ['React', 'https://reactjs.org/'],
  ['Bootstrap', 'https://getbootstrap.com/'], 
  ['React Bootstrap', 'https://react-bootstrap.github.io/'],
  ['Bootstrap Icons', 'https://icons.getbootstrap.com/'],
  ['react-bootstrap-table2', 'https://react-bootstrap-table.github.io/react-bootstrap-table2/'],
  ['CodeMirror', 'https://codemirror.net/'],
  ['react-codemirror2', 'https://github.com/scniro/react-codemirror2'],
  ['Recharts', 'https://recharts.org/en-US'],
  ['Split.js', 'https://split.js.org/'],
  ['React Router', 'https://reactrouter.com/'],
  ['FileSaver.js', 'https://github.com/eligrey/FileSaver.js'],
];

const createLink = (text, href) =>
  <a href={ href } target="_blank" rel="noopener noreferrer">{ text }</a>;

const InfoModal = React.memo((props) => {
  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>FPTaylor JS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          A JavaScript version of { createLink('FPTaylor', 'https://github.com/soarlab/FPTaylor') } compiled
          with { createLink('Js_of_ocaml', 'https://ocsigen.org/js_of_ocaml') }.
        </p>
        <p>
          Note: trigonometric functions are not supported because 
          the underlying { createLink('OCaml interval arithmetic library', 'https://github.com/monadius/ocaml_simple_interval') } does not
          implement them.
        </p>
        <p>This site { createLink('source code', 'https://github.com/monadius/FPTaylorJS') }.</p>
        <p>FPTaylor { createLink('reference', 'https://github.com/soarlab/FPTaylor/blob/develop/REFERENCE.md') }.</p>
        <hr/>
        <h4>Credits</h4>
        <ul>
          { credits.map((x, i) => <li key={i}>{ createLink(...x) }</li>) }
        </ul>
      </Modal.Body>
    </Modal>
  );
});

const toObject = { search: "?about=1" };

const Header = React.memo((props) => {
  const showInfo = !!useQuery().get('about');
  const history = useHistory();
  const onHide = useCallback(() => history.replace({search: ""}), [history]);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="py-0" style={{height: props.height}}>
        <Navbar.Brand as={Link}
          to={toObject}
        >
          FPTaylor JS
        </Navbar.Brand>
        <Nav activeKey="" className="justify-content-end flex-fill">
          <Nav.Link active={false} href="https://github.com/monadius/FPTaylorJS" target="_blank" rel="noopener noreferrer">GitHub</Nav.Link>
        </Nav>
      </Navbar>
      <InfoModal show={showInfo} onHide={onHide}/>
    </>
  );
});

export default Header;