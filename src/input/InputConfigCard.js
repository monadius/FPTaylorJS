import React, { useState, useCallback, useImperativeHandle, useReducer } from 'react';
import { Card, Nav } from 'react-bootstrap';

import Show from '../common/Show';
import ConfigControls from './ConfigControls';
import Editor from './Editor';
import ExampleSelection from './ExampleSelection';
import FileUploadButton from '../common/FileUploadButton';
import FileDownloadButton from '../common/FileDownloadButton';

import { parseConfig, optionsToString } from '../config-options';

function initState(examples) {
  const hasExamples = examples && examples.length >= 1;
  const value = hasExamples ? examples[0].data : '';
  return {
    value: value,
    selectionValue: hasExamples ? '0' : '--',
    options: parseConfig(value),
  };
}

const InputConfigCard = React.forwardRef(({examples = [], id, className, style, title, cmMode}, ref) => {
  const optionsReducer = useCallback((state, action) => {
    switch (action.type) {
      case 'set-value': 
        return {...state, value: action.value};
      case 'update-value': 
        return {...state, value: action.value, selectionValue: '--'};
      case 'sync-value':
        return {...state, value: action.value, options: parseConfig(action.value), selectionValue: '--'};
      case 'update-options': 
        return {...state, options: action.value};
      case 'update-option': 
        return {...state, selectionValue: '--', options: {...state.options, [action.name]: action.value}};
      case 'update-selection':
        if (!isNaN(action.value) && examples && +action.value < examples.length) {
          const text = examples[+action.value].data;
          return {...state, value: text, selectionValue: action.value, options: parseConfig(text)};
        }
        return state;
      default:
        return state;
    }
  }, [examples]);

  //const [value, setValue] = useState(examples.length >= 1 ? examples[0].data : "");
  //const [selectionValue, setSelectionValue] = useState(examples.length >= 1 ? "0" : "--");
  const [state, dispatch] = useReducer(optionsReducer, examples, initState);
  const [showText, setShowText] = useState(false);

  const getValue = () => showText ? state.value : optionsToString(state.options);

  useImperativeHandle(ref, () => ({
    get value() {
      return getValue();
    }
  }));

  const onLoadFile = useCallback((value) => {
    dispatch({type: 'sync-value', value: value});
  }, []);

  const onChange = useCallback((editor, data, value) => {
    dispatch({type: 'update-value', value: value});
  }, []);

  const onSelectionChange = useCallback((event) => {
    const value = event.target.value;
    dispatch({type: 'update-selection', value: value});
  }, []);

  const onSwitchTextControls = (key) => {
    if (key === 'text') {
      dispatch({type: 'set-value', value: optionsToString(state.options)});
      setShowText(true);
    }
    else {
      dispatch({type: 'update-options', value: parseConfig(state.value)});
      setShowText(false);
    }
  };

  const examplesId = id + '-examples';

  return (
    <Card className={className} style={style}>
      <Card.Header className="py-1 pr-1 d-flex align-items-center">
        <span>{title}</span>
        <FileUploadButton
          className="ml-1 border-0 py-0 px-1"
          onLoad={onLoadFile}
          maxSize={50 * 1024}
          tooltip="Select a file or drag and drop it into the editor"
        />
        <FileDownloadButton
          className="ml-1 border-0 py-0 px-1"
          value={getValue()}
          name="config.txt"
          tooltip="Save configuration in a file"
        />
        <ExampleSelection id={examplesId}
          className="ml-auto"
          examples={examples}
          value={state.selectionValue}
          onChange={onSelectionChange}
        />
      </Card.Header>
      <Card.Body className="p-0 overflow-auto">
        {
          // CodeMirror's layout is broken if its initial display style is 'none'
          // so we reinitialize it every time here
          showText && 
          <Editor className="h-100" value={state.value} onChange={onChange} mode={cmMode}/>
        }
        <Show show={!showText}>
          <ConfigControls 
            state={state.options}
            dispatch={dispatch}
          />
        </Show>
      </Card.Body>
      <Card.Footer className="py-1">
        <Nav variant="pills"
          className="justify-content-end"
          activeKey={showText ? 'text' : 'controls'}
          onSelect={onSwitchTextControls}
        >
          <Nav.Item>
            <Nav.Link eventKey="text" className="py-0">Text</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="controls" className="py-0">Controls</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Footer>
    </Card>
  );
});

export default React.memo(InputConfigCard);