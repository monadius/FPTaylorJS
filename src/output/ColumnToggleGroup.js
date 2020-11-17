import React from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import { ReactComponent as IconEye } from '../icons/eye.svg';
import { ReactComponent as IconEyeSlash } from '../icons/eyeSlash.svg';

const ColumnToggleGroup = ({
  columns,
  onColumnToggle,
  toggles,
  variant,
  ...otherProps
}) => {
  const values = Object.keys(toggles).filter(v => v !== 'name' && toggles[v]);
  return (
    <ToggleButtonGroup 
      {...otherProps}
      type="checkbox"
      value={values}
    >
      {
        columns
          .filter(column => column.dataField !== 'name')
          .map(column => (
            <ToggleButton
              variant={variant}
              key={ column.dataField }
              value={ column.dataField }
              onChange={e => onColumnToggle(e.target.value)}
            >
              { column.text.split(' ')[0] }
              { values.includes(column.dataField) ? 
                  <IconEye className="ml-1"/> :
                  <IconEyeSlash className="ml-1"/> }
            </ToggleButton>
          ))
      }
    </ToggleButtonGroup>
  );
}

export default ColumnToggleGroup;