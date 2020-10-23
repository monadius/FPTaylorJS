import React from 'react';
import Button from 'react-bootstrap/Button';

import InputCard from './InputCard';

class InputPane extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column h-100">
        <InputCard id="input" className="mb-1" style={{flex: 3}} title="Input"/>
        <InputCard id="config" className="my-1" style={{flex: 2}} title="Configuration"/>
        <div>
          <Button variant="success" className="w-25">Run</Button>
          <Button variant="primary" className="ml-1 w-25">Clear</Button>
        </div>
      </div>
    );
  }
}

export default InputPane;