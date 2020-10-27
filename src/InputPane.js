import React from 'react';
import Button from 'react-bootstrap/Button';

import InputCard from './InputCard';

import {configExamples, inputExamples} from './examples';

class InputPane extends React.PureComponent {
  onRunOrStop = () => {
    this.props.onRunOrStop("Variables x in [3, 5]; Expressions e rnd64= x + x;", "");
  }

  render() {
    const runButton = this.props.isRunning ?
      <Button variant="danger" className="w-25" onClick={this.onRunOrStop}>Stop</Button> :
      <Button variant="success" className="w-25" onClick={this.onRunOrStop}>Run</Button>;

    return (
      <div className="d-flex flex-column h-100">
        <InputCard id="input" examples={inputExamples}
          className="mb-1" style={{flex: 3}} title="Input"/>
        <InputCard id="config" examples={configExamples} 
          className="my-1" style={{flex: 2}} title="Configuration"/>
        <div>
          {runButton}
          <Button variant="primary" className="ml-1 w-25" onClick={this.props.onClear}>Clear</Button>
        </div>
      </div>
    );
  }
}

export default InputPane;