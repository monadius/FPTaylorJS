import React from 'react';
import Button from 'react-bootstrap/Button';

import InputCard from './InputCard';

import {configExamples, inputExamples} from './examples';

class InputPane extends React.PureComponent {
  render() {
    return (
      <div className="d-flex flex-column h-100">
        <InputCard id="input" examples={inputExamples}
          className="mb-1" style={{flex: 3}} title="Input"/>
        <InputCard id="config" examples={configExamples} 
          className="my-1" style={{flex: 2}} title="Configuration"/>
        <div>
          <Button variant="success" className="w-25" onClick={this.props.onRunFPTaylor}>Run</Button>
          <Button variant="primary" className="ml-1 w-25">Clear</Button>
        </div>
      </div>
    );
  }
}

export default InputPane;