import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { saveAs } from 'file-saver';

import { ReactComponent as IconDownload } from '../icons/download.svg';

const FileDownloadButton = ({value, name = 'out.txt', tooltip, ...props}) => {
  const onClick = () => {
    const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, name);
  }

  const button = (
    <Button variant="outline-secondary" onClick={onClick} {...props}>
      <IconDownload/>
    </Button>
  );

  return (
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
  );
}

export default FileDownloadButton;
