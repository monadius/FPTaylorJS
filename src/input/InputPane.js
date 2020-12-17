import React, { useState, useRef, useCallback } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import Split from 'react-split';
import copy from 'copy-to-clipboard';

import InputCard from './InputCard';
import InputConfigCard from './InputConfigCard';

import { ReactComponent as IconClipboard } from '../icons/clipboard.svg';

import './cm-modes/config.js'
import './cm-modes/fptaylor.js'

import {configExamples, inputExamples} from '../examples';

// const createGutter = (index, dir) => {
//   const gutter = document.createElement('div');
//   gutter.className = `d-none d-md-block gutter gutter-${dir}`;
//   return gutter;
// }

const ShareModal = React.memo((props) => {
  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Share link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <Form.Control type="text" readOnly={true} value={props.shareLink}/>
          <InputGroup.Append>
            <Button 
              variant="outline-secondary"
              onClick={() => copy(props.shareLink)}
            >
              <IconClipboard/>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Modal.Body>
    </Modal>
  );
});

const InputPane = React.memo(({isRunning, onRunOrStop}) => {
  const inputRef = useRef(null);
  const configRef = useRef(null);
  const [showShare, setShowShare] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const handleRun = useCallback(() => {
    onRunOrStop(inputRef.current.value, configRef.current.value)
  }, [onRunOrStop]);

  const handleShare = useCallback(() => {
    const input = encodeURIComponent(inputRef.current.value);
    const config = encodeURIComponent(configRef.current.value);
    setShareLink(`https://monadius.github.io/FPTaylorJS/#/?input=${input}&config=${config}`);
    setShowShare(true);
  }, []);

  const closeShare = useCallback(() => {
    setShowShare(false);
  }, []);
  
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
        <div className="" style={{paddingBottom: 2}}>
          <InputCard id="input" ref={inputRef}
            className="h-100"
            cmMode="fptaylor"
            examples={inputExamples}
            title="Input"/>
        </div>
        <div className="pb-2" style={{paddingTop: 2}}>
          <InputConfigCard id="config" ref={configRef}
            className="h-100"
            cmMode="fptaylor-config"
            examples={configExamples} 
            title="Configuration"/>
        </div>
      </Split>
      <div style={{height: '2.4rem'}}>
        {runButton}
        <Button variant="primary" className="ml-1 py-0 w-25 h-100" onClick={handleShare}>Share</Button>
        {/* <Button variant="primary" className="ml-1 py-0 w-25 h-100" 
          onClick={this.props.onClear}>Clear</Button> */}
      </div>
      <ShareModal show={showShare} shareLink={shareLink} onHide={closeShare}/>
    </div>
  );
});

export default InputPane;