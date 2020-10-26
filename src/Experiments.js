import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';

class Child extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {val: props.value};
  }

  render() {
    console.log('Child render: ' + this.state.val);
    return (
      <div>
        <Button variant="primary" onClick={this.props.onClick}>{this.props.value}</Button>
        <Button variant="secondary" onClick={() => this.setState({val: this.state.val + 1})}>{`My val ${this.state.val}`}</Button>
      </div>
    );
  }
}

export class Test extends React.Component {
  constructor(props) {
    super(props);
    console.log('Test constructed');
    this.state = {counter: 1, counter2: 2};
    this.add1 = () => this.setState(state => ({counter: state.counter + 1}));
    this.add2 = () => this.setState(state => ({counter2: state.counter2 + 2}));
  }

  componentDidMount() {
    console.log('Test did mount');
  }

  componentWillUnmount() {
    console.log('Test will unmount');
  }

  render() {
    console.log('Test render')
    return this.state.counter % 2 ?
    (
      <div>
        <Child value={this.state.counter} onClick={this.add1}></Child>
        <Child value={this.state.counter2} onClick={this.add2}></Child>
      </div>
    ) :
    (
      <div className="bg-light">
        <Child value={this.state.counter} onClick={this.add1}></Child>
         <Child value={this.state.counter2} onClick={this.add2}></Child>
       </div>
    );
  }
}