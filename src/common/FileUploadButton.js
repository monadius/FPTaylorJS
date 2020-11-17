import React, { useState, useEffect, useRef } from 'react';
import { Button, OverlayTrigger, Tooltip, Overlay, Alert } from 'react-bootstrap';

import { ReactComponent as IconUpload } from '../icons/upload.svg';

const FileUploadButton = ({onChange, onLoad, maxSize, tooltip, ...props}) => {
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const messageRef = useRef('');
  const [errorMessage, setErrorMessage] = useState('');

  const onClick = () => {
    ref.current.click();
  }

  useEffect(() => {
    if (errorMessage) {
      const id = setInterval(() => {
        clearInterval(id);
        setErrorMessage('')
      }, 3000);
      return () => clearInterval(id);
    }
  }, [errorMessage]);

  const updateErrorMessage = (msg) => {
    // We display the reference to the last error message in the Alert component
    // in order to make the fade out animation work correctly when the error message itself
    // is set to ''.
    messageRef.current = msg;
    setErrorMessage(msg);
  }

  const onInputChange = (event) => {
    const file = event.target.files[0];
    if (onChange) {
      onChange(file);
    }
    if (onLoad && file) {
      if (maxSize && file.size > maxSize) {
        updateErrorMessage('The selected file is too large');
      }
      else {
        const reader = new FileReader();
        reader.onload = e => onLoad(e.target.result);
        reader.onerror = () => updateErrorMessage(reader.error);
        reader.readAsText(file);
      }
    }
  }

  const button = (
    <Button
      ref={buttonRef}
      variant="outline-secondary" 
      onClick={onClick} 
      {...props}
    >
      <IconUpload/>
    </Button>
  );
  
  return (
    <> {
      tooltip ?
        <OverlayTrigger
          placement="top"
          delay={{ show: 0 }}
          overlay={
            <Tooltip>{tooltip}</Tooltip>
          }
        >
          {button}
        </OverlayTrigger> :
        button
      }
      <input
        type="file"
        ref={ref}
        className="d-none"
        onChange={onInputChange}
      />
      <Overlay 
        target={buttonRef.current} 
        show={!!errorMessage} 
        placement="bottom"
        transition={true}
      >
        {({arrowProps, style, ...props}) => (
          <Alert variant="danger" {...props} style={{...style, zIndex: 10}}>
            {messageRef.current}
          </Alert>
        )}
      </Overlay>
    </>
  );
}

export default FileUploadButton;
