import React, { useState } from 'react';
import { Form, Row, Col, Collapse } from 'react-bootstrap';

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

const SelectOption = ({label, values}) => {
  return (
    <Form.Group as={Row} className="align-items-center my-0 w-100" controlId={`id-${label}`}>
      <Form.Label column xs="4">{label}</Form.Label>
      <Col xs="8" className="px-1">
        <Form.Control as="select" size="sm" custom>
          {values.map((v, i) => <option key={i}>{v}</option>)}
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
        className="px-3 py-2 option-group-header"
        onClick={() => setShow(!show)}
      >
        {title}
      </div>
      <Collapse in={show}>
        <div>
          <div className="p-2">
            {children}
          </div>
        </div>
      </Collapse>
    </div>
  );
}

const ConfigControls = ({className = '', ...props}) => {
  return (
    <Form className={"px-0 py-0 " + className}>
      <OptionGroup title="General options" initShow={true}>
        <BoolOption label="Compute Absolute Error" initValue={props.absError}/>
        <BoolOption label="Compute Relative Error" initValue={props.relError}/>
        <BoolOption label="Compute ULP Error (experimental)" initValue={props.ulpError}/>
      </OptionGroup>
      <OptionGroup title="Output options" initShow={true}>
        <SelectOption label="Output verbosity" values={['Main results', 'Important results', 'Debug', 'All']}/>
        <NumericOption label="Print precision" min="1" max="20" initValue={5}/>
      </OptionGroup>
      <OptionGroup title="Optimization options">
        <NumericOption label="opt-x-abs-tol" min="0" max="1e3" step="1e-10" initValue={0.1}/>
      </OptionGroup>
    </Form>
  );
}

export default ConfigControls;
