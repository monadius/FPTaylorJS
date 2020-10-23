import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

class InputCard extends React.Component {
  render() {
    const examplesId = this.props.id + '-examples';
    const options = (this.props.examples || []).map(({name}, i) =>
      <option key={i} value={name}>{name}</option>);
    return (
      <Card className={this.props.className} style={this.props.style}>
        <Card.Header className="py-1 pr-1">
          <Form inline>
            <span>{this.props.title}</span>
            <Form.Label htmlFor={examplesId} className="ml-auto mr-2">Examples</Form.Label>
            <Form.Control id={examplesId} as="select" size="sm" custom>
              <option value="--">--</option>
              {options}
            </Form.Control>
          </Form>
        </Card.Header>
        <Card.Body className="p-0">
          <Form.Control id={this.props.id} as="textarea" className="h-100 w-100" 
            style={{resize: "none", border: "none", outline: "none"}}/>
        </Card.Body>
      </Card>
    );
  }
}

export default InputCard;