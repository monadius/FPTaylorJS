import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

class InputCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      selectionValue: "--"
    };
  }

  get value() {
    return this.state.value;
  }

  onChange = (event) => {
    this.setState({value: event.target.value});
  }

  static getSelectedExample(examples, value) {
    if (!isNaN(value) && examples && +value < examples.length) {
      return examples[+value].data;
    }
    return null;
  }

  onSelectionChange = (event) => {
    const value = event.target.value;
    this.setState({selectionValue: value});
    const example = InputCard.getSelectedExample(this.props.examples, value);
    if (example !== null) {
      this.setState({value: example});
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   const example = InputCard.getSelectedExample(props.examples, state.selectionValue);
  //   if (example !== null && example !== props.value) {
  //     return {selectionValue: "--"};
  //   }
  //   return null;
  // }

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