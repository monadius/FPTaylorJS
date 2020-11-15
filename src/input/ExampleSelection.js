import React from 'react';
import Form from 'react-bootstrap/Form';

const ExampleSelection = ({id, className = "", examples = [], value, onChange}) => {
  const options = examples.map(({name}, i) =>
    <option key={i} value={i}>{name}</option>);

  return (
    <Form className={"d-flex align-items-center " + className}>
      <Form.Label htmlFor={id} className="mr-2 my-0">Examples</Form.Label>
      <Form.Control id={id} as="select"
        value={value}
        onChange={onChange}
        size="sm" custom>
        <option value="--">--</option>
        {options}
      </Form.Control>
    </Form>
  );
}

export default React.memo(ExampleSelection);