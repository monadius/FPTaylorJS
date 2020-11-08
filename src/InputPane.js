import React, { useRef, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Split from 'react-split';

import InputCard from './InputCard';

import './cm-modes/config.js'
import './cm-modes/fptaylor.js'

import {configExamples, inputExamples} from './examples';

// const createGutter = (index, dir) => {
//   const gutter = document.createElement('div');
//   gutter.className = `d-none d-md-block gutter gutter-${dir}`;
//   return gutter;
// }

const InputPane = React.memo(({isRunning, onRunOrStop}) => {
  const inputRef = useRef(null);
  const configRef = useRef(null);
  const handleRun = useCallback(() => 
    onRunOrStop(inputRef.current.value, configRef.current.value));
  
  const runButton = isRunning ?
      <Button variant="danger" className="w-25 py-0 h-100" onClick={handleRun}>Stop</Button> :
      <Button variant="success" className="w-25 py-0 h-100" onClick={handleRun}>Run</Button>;

  return (
    <div className="h-100">
      <Split
        sizes={[60, 40]}
        minSize={100}
        expandToMin={false}
        gutterSize={6}
        gutterAlign="center"
        // gutter={createGutter}
        snapOffset={30}
        dragInterval={1}
        direction="vertical"
        cursor="row-resize"
        style={{height: 'calc(100% - 2.4rem)'}}
      >
        <div className="pb-0" style={{height: '60%'}}>
          <InputCard id="input" ref={inputRef}
            className="h-100"
            cmMode="fptaylor"
            examples={inputExamples}
            title="Input"/>
        </div>
        <div className="pb-2" style={{height: '40%'}}>
          <InputCard id="config" ref={configRef}
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
});

export default InputPane;