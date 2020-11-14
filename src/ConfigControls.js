import React, { useState } from 'react';
import { Form, Row, Col, Collapse } from 'react-bootstrap';

import { optionInfo, optionGroups, defaultValues } from './config-options';

const BoolOption = ({name, label, value, dispatch}) => {
  return (
    <Form.Switch 
      id={`id-${label}`}
      checked={value}
      onChange={(e) => dispatch({name, value: e.target.checked})}
      label={label}
    />
  );
}

// const BoolOption2 = ({label, initValue = false}) => {
//   const [value, setValue] = useState(initValue);
//   return (
//     <Form.Group as={Row} className="align-items-center my-0" controlId={`id-${label}`}>
//       <Form.Label column xs="auto">{label}</Form.Label>
//       <Col xs="auto">
//         <Form.Switch 
//           id={`id-${label}`}
//           checked={value}
//           onChange={(e) => setValue(e.target.checked)}
//         />
//       </Col>
//     </Form.Group>
//   );
// }

const StringOption = ({name, label, value, dispatch}) => {
  return (
    <Form.Group as={Row} className="align-items-center my-0 w-100" controlId={`id-${label}`}>
      <Form.Label column xs="4">{label}</Form.Label>
      <Col xs="8" className="px-1">
        <Form.Control size="sm"
          id={`id-${label}`}
          value={value}
          onChange={(e) => dispatch({name, value: e.target.value})}
          />
      </Col>
    </Form.Group>  
  );
}

const SelectOption = ({name, label, values, names = values, value, dispatch}) => {
  return (
    <Form.Group as={Row} className="align-items-center my-0 w-100" controlId={`id-${label}`}>
      <Form.Label column xs="4">{label}</Form.Label>
      <Col xs="8" className="px-1">
        <Form.Control as="select" size="sm" custom
          value={value}
          onChange={(e) => dispatch({name, value: e.target.value})}
        >
          {values.map((v, i) => <option key={i} value={v}>{names[i]}</option>)}
        </Form.Control>
      </Col>
    </Form.Group>
  );
}

const NumericOption = ({name, label, min, max, step = 1, value, dispatch}) => {
  const id = `id-${label}`;
  return (
    <Form.Group as={Row} className="align-items-center my-0 w-100">
      <Form.Label column xs="4" htmlFor={id}>{label}</Form.Label>
      <Col xs="4" className="px-1 pt-2">
        <Form.Control type="range" size="sm" custom id={id}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => dispatch({name, value: e.target.value})}
        />
      </Col>
      <Col xs="4" className="px-1">
        <Form.Control type="number" size="sm" id={`id2-${label}`}
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={(e) => e.target.validity.valid && dispatch({name, value: e.target.value})}
        />
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

// function optionsReducer(state, action) {
//   return {...state, [action.name]: action.value};
// }

function createOption(name, option, state, dispatch) {
  const label = option.label || name;
  const key = name;
  const value = typeof state[name] === 'undefined' ? defaultValues[name] : state[name];
  if (option.values) {
    return <SelectOption key={key} name={name} label={label} 
              value={value}
              dispatch={dispatch}
              values={option.values} 
              names={option.valueNames}/>
  }
  switch (option.type) {
    case 'bool':
      return <BoolOption key={key} name={name} label={label} value={value} dispatch={dispatch}/>;
    case 'string':
      return <StringOption key={key} name={name} label={label} value={value} dispatch={dispatch}/>;
    case 'int':
      return <NumericOption key={key} name={name} label={label} 
                value={value}
                dispatch={dispatch}
                min={option.min || 0}
                max={typeof option.max === 'undefined' ? 2**32 - 1 : option.max}
                step={option.step || 1}/>
    case 'float':
      return <NumericOption key={key} name={name} label={label}
                value={value}
                dispatch={dispatch}
                min={option.min || 0}
                max={typeof option.max === 'undefined' ? 1e9 : option.max}
                step={option.step || 1e-2}/>
    default:
      return null;
  }
}

const ConfigControls = ({className = '', state, dispatch, ...props}) => {
  // const [state, dispatch] = useReducer(optionsReducer, {});
  const groups = optionGroups.map(g => 
    <OptionGroup key={g.title} title={g.title} initShow={g.initShow}>
      { g.options.map(name => createOption(name, optionInfo[name], state, dispatch)) }
    </OptionGroup>
  );
  return (
    <Form className={"px-0 py-0 " + className}>
      { groups }
    </Form>
  );
}

export default ConfigControls;
