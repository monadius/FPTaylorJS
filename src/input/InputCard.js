import React, { useState, useCallback, useImperativeHandle } from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import Editor from './Editor';
import ExampleSelection from './ExampleSelection';
import FileUploadButton from '../common/FileUploadButton';
import FileDownloadButton from '../common/FileDownloadButton';
import { getSearchParam } from '../common/utils';

const InputCard = React.forwardRef(({examples = [], id, className, style, title, cmMode}, ref) => {
  const location = useHistory().location;
  const [value, setValue] = useState(() => {
    const initInput = getSearchParam(location, 'input');
    return initInput ? initInput :
           examples.length >= 1 ? examples[0].data : '';
  });
  const [selectionValue, setSelectionValue] = useState(() =>
    examples.length >= 1 && value === examples[0].data ? '0' : '--'
  );

  useImperativeHandle(ref, () => ({
    get value() {
      return value;
    }
  }));

  const onChangeValue = useCallback((value) => {
    setValue(value);
    setSelectionValue('--');
  }, []);

  const onChange = useCallback((editor, data, value) => {
    onChangeValue(value);
  }, [onChangeValue]);

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
        <FileUploadButton
          className="ml-1 border-0 py-0 px-1"
          onLoad={onChangeValue}
          maxSize={50 * 1024}
          tooltip="Select a file or drag and drop it into the editor"
        />
        <FileDownloadButton
          className="ml-1 border-0 py-0 px-1"
          value={value}
          name="input.txt"
          tooltip="Save input into a file"
        />
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