import React from 'react';
import { Card, Form, Nav } from 'react-bootstrap';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';

import Show from '../Show';
import ConfigControls from './ConfigControls';
import Editor from './Editor';

import { parseConfig, optionsToString } from '../config-options';

class InputConfigCard extends React.Component {
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
    this.state.showText = false;
    this.state.options = parseConfig(this.state.value);
  }

  get value() {
    return this.state.showText ? 
      this.state.value :
      optionsToString(this.state.options);
  }

  onChange = (editor, data, value) => {
    this.setState({value: value, selectionValue: "--"});
  }

  onExampleSelectionChange = (event) => {
    const value = event.target.value;
    this.setState({selectionValue: value});
    if (!isNaN(value) && this.props.examples && +value < this.props.examples.length) {
      const text = this.props.examples[+value].data;
      this.setState({
        value: text,
        options: parseConfig(text)
      });
    }
  }

  onSwitchTextControls = (key) => {
    if (key === 'text') {
      this.setState(state => ({
        value: optionsToString(state.options),
        showText: true
      }));
    }
    else {
      this.setState(state => ({
        options: parseConfig(state.value),
        showText: false
      }));
    }
  }

  dispatchOptions = ({name, value}) => {
    this.setState(state => {
      const newOptions = {...state.options, [name]: value};
      return {options: newOptions, selectionValue: "--"};
    });
  }

  render() {
    const showText = this.state.showText;
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
                onChange={this.onExampleSelectionChange}
                size="sm" custom>
                <option value="--">--</option>
                {options}
              </Form.Control>
            </Form>
          </Card.Header>
          <Card.Body className="p-0 overflow-auto">
            {
              // CodeMirror's layout is broken if its initial display style is 'none'
              // so we reinitialize it every time here
              showText && 
              <Editor className="h-100" value={this.state.value} onChange={this.onChange} mode={this.props.cmMode}/>
            }
            <Show show={!showText}>
              <ConfigControls 
                state={this.state.options}
                dispatch={this.dispatchOptions}
              />
            </Show>
          </Card.Body>
          <Card.Footer className="py-1">
            <Nav variant="pills"
              className="justify-content-end"
              activeKey={showText ? 'text' : 'controls'}
              onSelect={this.onSwitchTextControls}
            >
              <Nav.Item>
                <Nav.Link eventKey="text" className="py-0">Text</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="controls" className="py-0">Controls</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Footer>
        </Card>
    );
  }
}

export default InputConfigCard;