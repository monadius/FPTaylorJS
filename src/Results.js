import React from 'react';
import Table from 'react-bootstrap/Table';

class Results extends React.PureComponent {
  render() {
    const rows = this.props.data.map((res, i) =>
      <tr key={i}>
        <td>{res.name}</td>
        <td>{res.absErrorExactStr || res.absErrorApproxStr || '-'}</td>
        <td>{res.relErrorExactStr || res.relErrorApproxStr || '-'}</td>
        {/* <td>{res.ulpErrorExactStr || res.ulpErrorApproxStr || '-'}</td> */}
        <td>{res.elapsedTime.toFixed(2) + 's'}</td>
      </tr>
    );

    return (
      <Table striped hover borderless>
        <thead>
          <tr>
            <th>Name</th>
            <th>Abs Error</th>
            <th>Rel Error</th>
            {/* <th>Ulp Error</th> */}
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {rows}
          {/* <tr>
            <td>doppler1</td><td>1.34e-11</td><td>1.34e-11</td><td>-</td><td>3.2s</td>
          </tr>
          <tr>
            <td>doppler1</td><td>1.34e-11</td><td>1.34e-11</td><td>-</td><td>3.2s</td>
          </tr>
          <tr>
            <td>doppler1</td><td>1.34e-11</td><td>1.34e-11</td><td>-</td><td>3.2s</td>
          </tr>
          <tr>
            <td>doppler1</td><td>1.34e-11</td><td>1.34e-11</td><td>-</td><td>3.2s</td>
          </tr> */}
        </tbody>
      </Table>
    );
  }
}

export default Results;