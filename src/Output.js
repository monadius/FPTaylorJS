import React from 'react';

class Output extends React.Component {
  render() {
    const outputLines = this.props.data.map((line, i) =>
      <div key={i}>{line}</div>);
    return (
      <pre className="h-100 p-2 overflow-auto">
        {outputLines}
      </pre>
    );
  }
}

export default Output;