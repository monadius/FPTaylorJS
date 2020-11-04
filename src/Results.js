import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { Button, ButtonGroup, ButtonToolbar, OverlayTrigger, Tooltip } from 'react-bootstrap';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { ReactComponent as IconEye } from './icons/eye.svg';
import { ReactComponent as IconEyeSlash } from './icons/eyeSlash.svg';
import { ReactComponent as IconTable } from './icons/table.svg';
import { ReactComponent as IconTrash } from './icons/trash.svg';

const cellStyle = {
  whiteSpace: 'nowrap',
};

const sortFunc = (a, b, order) =>
  order === 'asc' ? a - b : b - a;

const columns = [{
  dataField: 'name',
  text: 'name',
  sort: true,
  headerStyle: cellStyle,
  style: cellStyle,
}, {
  dataField: 'absError',
  text: 'abs error',
  sort: true,
  sortFunc: sortFunc,
  headerStyle: cellStyle,
  style: cellStyle
}, {
  dataField: 'relError',
  text: 'rel error',
  sort: true,
  sortFunc: sortFunc,
  headerStyle: cellStyle,
  style: cellStyle
}, {
  dataField: 'ulpError',
  text: 'ulp error',
  sort: true,
  sortFunc: sortFunc,
  headerStyle: cellStyle,
  style: cellStyle
}, {
  dataField: 'elapsedTime',
  text: 'time',
  sort: true,
  sortFunc: sortFunc,
  headerStyle: cellStyle,
  style: cellStyle
}];

const ExpandedRow = (props) => {
  const [show, changeShow] = useState(false);
  const row = props.row;

  return (
    <>
      <p>Bounds: [{row.bounds[0]}, {row.bounds[1]}]</p>
      <Button onClick={() => changeShow(!show)}>Plot</Button>
      { show && <div style={{height: "800px", width: "800px"}}>Big Chart</div> }
    </>
  );
}

const expandRow = {
  // To prevent the hover effect
  className: "bg-white",
  renderer: row => <ExpandedRow row={ row }/>
};

const CustomToggleList = ({
  columns,
  onColumnToggle,
  toggles,
  ...otherProps
}) => {
  const values = Object.keys(toggles).filter(v => v !== 'name' && toggles[v]);
  return (
    <ToggleButtonGroup 
      {...otherProps}
      type="checkbox"
      value={values}
    >
      {
        columns
          .filter(column => column.dataField !== 'name')
          .map(column => (
            <ToggleButton variant="primary"
              key={ column.dataField }
              value={ column.dataField }
              onChange={e => onColumnToggle(e.target.value)}
            >
              { column.text.split(' ')[0] }
              { values.includes(column.dataField) ? 
                  <IconEye className="ml-1"/> :
                  <IconEyeSlash className="ml-1"/> }
            </ToggleButton>
          ))
      }
    </ToggleButtonGroup>
  );
}

class Results extends React.PureComponent {
  constructor(props) {
    super(props);

    this.columns = columns.map(c => ({...c, onSort: this.handleSort}))
    const toggles = columns.reduce((r, c) => {
        r[c.dataField] = (props.initHidden || [])[c.dataField] ? false : true;
        return r;
    }, {});

    console.log(toggles);

    this.state = {
      sortField: null,
      sortOrder: null,
      toggles: toggles,
      selected: [],
      hidden: [],
    }
  }

  handleColumnToggle = (columnName) => {
    const { toggles } = this.state;
    const newToggles = {...toggles, [columnName]: !toggles[columnName]};
    this.setState({toggles: newToggles});
  }

  handleSort = (field, order) => {
    this.setState({sortField: field, sortOrder: order});
  }

  handleOnSelect = (row, isSelected) => {
    if (isSelected) {
      this.setState(state => ({selected: [...state.selected, row.id]}));
    }
    else {
      this.setState(state => ({selected: state.selected.filter(x => x !== row.id)}));
    }
  }

  handleOnSelectAll = (isSelected, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelected) {
      this.setState(() => ({selected: ids}));
    }
    else {
      this.setState(() => ({selected: []}));
    }
  }

  reset = () => {
    this.handleSort('-', 'asc');
    this.setState(() => ({hidden: []}));
  }

  hideSelected = () => {
    if (this.state.selected.length > 0) {
      this.setState(state => ({hidden: [...state.hidden, ...state.selected], selected: []}));
    }
  }

  render() {
    const selectRow = {
      mode: 'checkbox',
      clickToExpand: true,
      selected: this.state.selected,
      onSelect: this.handleOnSelect,
      onSelectAll: this.handleOnSelectAll
    };
    return (
      <>
        <ButtonToolbar className="mb-1 mt-2 justify-content-center">
          <ButtonGroup className="mx-2">
            <OverlayTrigger
              placement="top"
              delay={{show: 500}}
              overlay={<Tooltip>Reset hidden rows and the sorting state</Tooltip>}
            >
              <Button onClick={this.reset}>
                <IconTable width="1.3em" height="1.3em"/>
              </Button>
            </OverlayTrigger>
            {/* <OverlayTrigger
              placement="top"
              delay={{show: 500}}
              show={this.state.showHideTooltip}
              onToggle={(nextShow) => this.setState({showHideTooltip: nextShow && this.state.selected.length > 0})}
              overlay={<Tooltip>Hide selected rows</Tooltip>}
            > */}
              <Button onClick={this.hideSelected} 
                disabled={!this.state.selected.length}
              >
                <IconTrash width="1.3em" height="1.3em"/>
              </Button>
            {/* </OverlayTrigger> */}
          </ButtonGroup>
          <CustomToggleList
            columns={ this.columns }
            onColumnToggle={ this.handleColumnToggle }
            toggles={ this.state.toggles }
          />
        </ButtonToolbar>
        <BootstrapTable
          keyField='id'
          data={ this.props.data }
          columns={ this.columns }
          columnToggle={{toggles: this.state.toggles}}
          bootstrap4 hover
          // classes="table-borderless"
          bordered={ false }
          headerWrapperClasses="border-0"
          sort={{dataField: this.state.sortField, order: this.state.sortOrder}}
          hiddenRows={ this.state.hidden }
          selectRow={ selectRow }
          expandRow={ expandRow }
        />
      </>
    );
  }
}

export default Results;