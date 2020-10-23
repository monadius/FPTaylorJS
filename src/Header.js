import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';

class InfoModal extends React.Component {
  render() {
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>FPTaylor JS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>A JavaScript version of <a href="https://github.com/soarlab/FPTaylor" target="_blank" rel="noopener noreferrer">FPTaylor</a> compiled with <a href="https://ocsigen.org/js_of_ocaml" target="_blank" rel="noopener noreferrer">Js_of_ocaml</a>.
          </p>
          <p>The site is created with <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> and <a href="https://getbootstrap.com" target="_blank" rel="noopener noreferrer">Bootstrap</a>.</p>
          <hr/>
          <p>FPTaylor <a href="https://github.com/soarlab/FPTaylor/blob/develop/REFERENCE.md" target="_blank" rel="noopener noreferrer">reference</a>.</p>
          <p>Note: trigonometric functions are not supported because the <a href="https://github.com/monadius/ocaml_simple_interval" target="_blank" rel="noopener noreferrer">OCaml interval arithmetic library</a> does not implement them.
          </p>
        </Modal.Body>
      </Modal>
    );
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showInfo: false};
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" className="py-0" style={{height: this.props.height}}>
          <Navbar.Brand href="#info" onClick={() => this.setState({showInfo: true})}>FPTaylor JS</Navbar.Brand>
        </Navbar>
        <InfoModal show={this.state.showInfo} onHide={() => this.setState({showInfo: false})}/>
      </>
    );
  }
}

export default Header;