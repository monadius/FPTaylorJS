import React, { useState, useCallback, useImperativeHandle } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import Editor from './Editor';

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
        <Editor className="h-100" value={value} onChange={onChange} mode={cmMode}/>
      </Card.Body>
    </Card>
  );
});

export default React.memo(InputCard);