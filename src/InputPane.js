import React from 'react';
import Button from 'react-bootstrap/Button';

import InputCard from './InputCard';

import {configExamples, inputExamples} from './examples';

class InputPane extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      configValue: ""
    };
  }

  onRunOrStop = () => {
    this.props.onRunOrStop(this.state.inputValue, this.state.configValue);
  }

  onInputChange = (value) => {
    this.setState({inputValue: value});
  }

  onConfigChange = (value) => {
    this.setState({configValue: value});
  }

  render() {
    const runButton = this.props.isRunning ?
      <Button variant="danger" className="w-25" onClick={this.onRunOrStop}>Stop</Button> :
      <Button variant="success" className="w-25" onClick={this.onRunOrStop}>Run</Button>;

    return (
      <div className="d-flex flex-column h-100">
        <InputCard id="input"
          value={this.state.inputValue}
          onChange={this.onInputChange}
          examples={inputExamples}
          className="mb-1" style={{flex: 3}} title="Input"/>
        <InputCard id="config"
          value={this.state.configValue}
          onChange={this.onConfigChange}
          examples={configExamples} 
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