import React, { useState, useCallback, useImperativeHandle } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';

const InputCard = React.forwardRef(({examples = [], id, className, style, title, cmMode}, ref) => {
  const [value, setValue] = useState(examples.length >= 1 ? examples[0].data : "");
  const [selectionValue, setSelectionValue] = useState(examples.length >= 1 ? "0" : "--");

  useImperativeHandle(ref, () => ({
    get value() {
      return value;
    }
  }));

  const onChange = useCallback((editor, data, value) => {
    setValue(value);
    setSelectionValue("--");
  }, []);

  const onSelectionChange = useCallback((event) => {
    const value = event.target.value;
    setSelectionValue(value);
    if (!isNaN(value) && examples && +value < examples.length) {
      setValue(examples[+value].data);
    }
  }, [examples]);

  const examplesId = id + '-examples';
  const options = examples.map(({name}, i) =>
    <option key={i} value={i}>{name}</option>);
  
  return (
    <Card className={className} style={style}>
      <Card.Header className="py-1 pr-1">
        <Form inline>
          <span>{title}</span>
          <Form.Label htmlFor={examplesId} className="ml-auto mr-2">Examples</Form.Label>
          <Form.Control id={examplesId} as="select"
            value={selectionValue}
            onChange={onSelectionChange}
            size="sm" custom>
            <option value="--">--</option>
            {options}
          </Form.Control>
        </Form>
      </Card.Header>
      <Card.Body className="p-0">
        <CodeMirror
          className="h-100"
          value={value}
          onBeforeChange={onChange}
          options={{
            mode: cmMode,
            // theme: 'material',
            lineNumbers: true,
            tabSize: 2
          }}
          // onChange={(editor, data, value) => {
          // }}
        />
        {/* <Form.Control id={this.props.id} as="textarea"
          value={this.state.value}
          onChange={this.onChange}
          className="text-monospace h-100 w-100"
          spellCheck={false}
          style={{resize: "none", border: "none", outline: "none", fontSize: "87%"}}/> */}
      </Card.Body>
    </Card>
  );
});

export default React.memo(InputCard);