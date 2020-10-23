import React from 'react';
import Table from 'react-bootstrap/Table';

class Results extends React.Component {
  render() {
    return (
      <Table striped hover borderless>
        <thead>
          <tr>
            <th>Name</th>
            <th>Abs Error</th>
            <th>Rel Error</th>
            <th>Ulp Error</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
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
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default Results;