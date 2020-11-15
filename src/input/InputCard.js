import React, { useState, useCallback, useImperativeHandle } from 'react';
import Card from 'react-bootstrap/Card';

import Editor from './Editor';
import ExampleSelection from './ExampleSelection';

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

  return (
    <Card className={className} style={style}>
      <Card.Header className="py-1 pr-1 d-flex align-items-center">
        <span>{title}</span>
        <ExampleSelection id={examplesId}
          className="ml-auto"
          examples={examples}
          value={selectionValue}
          onChange={onSelectionChange}
        />
      </Card.Header>
      <Card.Body className="p-0">
        <Editor className="h-100" value={value} onChange={onChange} mode={cmMode}/>
      </Card.Body>
    </Card>
  );
});

export default React.memo(InputCard);