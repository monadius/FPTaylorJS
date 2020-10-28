import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

class InputCard extends React.Component {
  constructor(props) {
    super(props);
    if (props.examples && props.examples.length >= 1) {
      this.state = {
        value: props.examples[0].data,
        selectionValue: "0"
      };
    }
    else {
      this.state = {
        value: "",
        selectionValue: "--"
      };
    }
  }

  get value() {
    return this.state.value;
  }

  onChange = (event) => {
    this.setState({value: event.target.value, selectionValue: "--"});
  }

  onSelectionChange = (event) => {
    const value = event.target.value;
    this.setState({selectionValue: value});
    if (!isNaN(value) && this.props.examples && +value < this.props.examples.length) {
      this.setState({value: this.props.examples[+value].data});
    }
  }

  render() {
    console.log(`Render: ${this.props.id}`)
    const examplesId = this.props.id + '-examples';
    const options = (this.props.examples || []).map(({name}, i) =>
      <option key={i} value={i}>{name}</option>);
    return (
      <Card className={this.props.className} style={this.props.style}>
        <Card.Header className="py-1 pr-1">
          <Form inline>
            <span>{this.props.title}</span>
            <Form.Label htmlFor={examplesId} className="ml-auto mr-2">Examples</Form.Label>
            <Form.Control id={examplesId} as="select"
              value={this.state.selectionValue}
              onChange={this.onSelectionChange}
              size="sm" custom>
              <option value="--">--</option>
              {options}
            </Form.Control>
          </Form>
        </Card.Header>
        <Card.Body className="p-0">
          <Form.Control id={this.props.id} as="textarea"
            value={this.state.value}
            onChange={this.onChange}
            className="text-monospace h-100 w-100"
            spellCheck={false}
            style={{resize: "none", border: "none", outline: "none", fontSize: "87%"}}/>
        </Card.Body>
      </Card>
    );
  }
}

export default InputCard;