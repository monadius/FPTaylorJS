import React from 'react';

class Output extends React.PureComponent {
  render() {
    const outputLines = this.props.data.map(({id, ty, str}) =>
      <div key={id} className={ty === 1 ? '' : 'text-danger'}>{str}</div>);
    return (
      <pre className="h-100 p-2 overflow-auto">
        {outputLines}
      </pre>
    );
  }
}

export default Output;