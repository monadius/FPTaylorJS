import React from 'react';
import Button from 'react-bootstrap/Button';

import InputCard from './InputCard';

import {configExamples, inputExamples} from './examples';

class InputPane extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.configRef = React.createRef();
  }

  onRunOrStop = () => {
    this.props.onRunOrStop(this.inputRef.current.value, this.configRef.current.value);
  }

  render() {
    const runButton = this.props.isRunning ?
      <Button variant="danger" className="w-25 py-0 h-100" onClick={this.onRunOrStop}>Stop</Button> :
      <Button variant="success" className="w-25 py-0 h-100" onClick={this.onRunOrStop}>Run</Button>;

    return (
      <div className="h-100">
        <div className="pb-0" style={{height: 'calc(60% - 1.6rem)'}}>
          <InputCard id="input" ref={this.inputRef}
            className="h-100"
            examples={inputExamples}
            title="Input"/>
        </div>
        <div className="py-2" style={{height: 'calc(40% - 0.8rem)'}}>
          <InputCard id="config" ref={this.configRef}
            className="h-100"
            examples={configExamples} 
            title="Configuration"/>
        </div>
        <div style={{height: '2.4rem'}}>
          {runButton}
          <Button variant="primary" className="ml-1 py-0 w-25 h-100" 
            onClick={this.props.onClear}>Clear</Button>
        </div>
      </div>
    );
  }
}

export default InputPane;