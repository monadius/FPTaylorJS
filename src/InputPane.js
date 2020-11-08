import React from 'react';
import Button from 'react-bootstrap/Button';
import Split from 'react-split';

import InputCard from './InputCard';

import './cm-modes/config.js'
import './cm-modes/fptaylor.js'

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

  createGutter = (index, dir) => {
    const gutter = document.createElement('div');
    gutter.className = `d-none d-md-block gutter gutter-${dir}`;
    return gutter;
  }

  render() {
    const runButton = this.props.isRunning ?
      <Button variant="danger" className="w-25 py-0 h-100" onClick={this.onRunOrStop}>Stop</Button> :
      <Button variant="success" className="w-25 py-0 h-100" onClick={this.onRunOrStop}>Run</Button>;

    return (
      <div className="h-100">
        <Split
          sizes={[60, 40]}
          minSize={100}
          expandToMin={false}
          gutterSize={6}
          gutterAlign="center"
          gutter={this.createGutter}
          snapOffset={30}
          dragInterval={1}
          direction="vertical"
          cursor="row-resize"
          style={{height: 'calc(100% - 2.4rem)'}}
        >
        {/* <Split style={{height: 'calc(100% - 2.4rem)'}}> */}
          <div className="pb-0" style={{height: '60%'}}>
            <InputCard id="input" ref={this.inputRef}
              className="h-100"
              cmMode="fptaylor"
              examples={inputExamples}
              title="Input"/>
          </div>
          <div className="pb-2" style={{height: '40%'}}>
            <InputCard id="config" ref={this.configRef}
              className="h-100"
              cmMode="fptaylor-config"
              examples={configExamples} 
              title="Configuration"/>
          </div>
        </Split>
        <div style={{height: '2.4rem'}}>
          {runButton}
          {/* <Button variant="primary" className="ml-1 py-0 w-25 h-100" 
            onClick={this.props.onClear}>Clear</Button> */}
        </div>
      </div>
    );
  }
}

export default InputPane;