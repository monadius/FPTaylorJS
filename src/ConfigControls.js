import React, { useState } from 'react';
import { Form, Row, Col, Collapse } from 'react-bootstrap';

import { optionInfo, optionGroups } from './config_options';

const BoolOption = ({label, initValue = false}) => {
  const [value, setValue] = useState(initValue);
  return (
    <Form.Switch 
      id={`id-${label}`}
      checked={value}
      onChange={(e) => setValue(e.target.checked)}
      label={label}
    />
  );
}

const BoolOption2 = ({label, initValue = false}) => {
  const [value, setValue] = useState(initValue);
  return (
    <Form.Group as={Row} className="align-items-center my-0" controlId={`id-${label}`}>
      <Form.Label column xs="auto">{label}</Form.Label>
      <Col xs="auto">
        <Form.Switch 
          id={`id-${label}`}
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
        />
      </Col>
    </Form.Group>
  );
}

const SelectOption = ({label, values, names = values}) => {
  return (
    <Form.Group as={Row} className="align-items-center my-0 w-100" controlId={`id-${label}`}>
      <Form.Label column xs="4">{label}</Form.Label>
      <Col xs="8" className="px-1">
        <Form.Control as="select" size="sm" custom>
          {values.map((v, i) => <option key={i} values={v}>{names[i]}</option>)}
        </Form.Control>
      </Col>
    </Form.Group>
  );
}

const NumericOption = ({label, min, max, step = 1, initValue = min}) => {
  const [value, setValue] = useState(initValue);
  return (
    <Form.Group as={Row} className="align-items-center my-0 w-100" controlId={`id-${label}`}>
      <Form.Label column xs="4">{label}</Form.Label>
      <Col xs="4" className="align-self-end px-1">
        <Form.Control type="range" size="sm" custom
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Col>
      <Col xs="4" className="px-1">
        <Form.Control type="number" size="sm"
          step={step}
          min={min}
          max={max}
          onChange={(e) => e.target.validity.valid && setValue(e.target.value)}
          value={value}/>
      </Col>
    </Form.Group>
  );
}

const OptionGroup = ({initShow = false, title, children}) => {
  const [show, setShow] = useState(initShow);
  return (
    <div className="option-group">
      <div 
        className="px-3 py-2 option-group-header font-weight-bold"
        onClick={() => setShow(!show)}
      >
        {title}
      </div>
      <Collapse in={show}>
        <div>
          <div className="pl-3 pr-1 py-1">
            {children}
          </div>
        </div>
      </Collapse>
    </div>
  );
}

function createOption(name, option) {
  const label = option.label || name;
  const key = name;
  if (option.values) {
    return <SelectOption key={key} label={label} values={option.values} names={option.valueNames}/>
  }
  switch (option.type) {
    case 'bool':
      return <BoolOption key={key} label={label}/>;
    case 'int':
      return <NumericOption key={key} label={label} 
                min={option.min || 0}
                max={typeof option.max === 'undefined' ? 2**32 - 1 : option.max}
                step={option.step || 1}/>
    case 'float':
      return <NumericOption key={key} label={label}
                min={option.min || 0}
                max={typeof option.max === 'undefined' ? 1e9 : option.max}
                step={option.step || 1e-2}/>
  }
}

const ConfigControls = ({className = '', ...props}) => {
  const groups = optionGroups.map(g => 
    <OptionGroup key={g.title} title={g.title} initShow={g.initShow}>
      { g.options.map(name => createOption(name, optionInfo[name])) }
    </OptionGroup>
  );
  return (
    <Form className={"px-0 py-0 " + className}>
      { groups }
    </Form>
  );
}

export default ConfigControls;
