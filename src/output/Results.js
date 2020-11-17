import React, { useState, useMemo, useCallback } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, ButtonGroup, ButtonToolbar, OverlayTrigger, Tooltip } from 'react-bootstrap';

import ColumnToggleGroup from './ColumnToggleGroup';
import ResultRow from './ResultRow';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { ReactComponent as IconTable } from '../icons/table.svg';
import { ReactComponent as IconTrash } from '../icons/trash.svg';

const cellStyle = {
  whiteSpace: 'nowrap',
};

const sortFunc = (a, b, order) =>
  order === 'asc' ? a - b : b - a;

const columnsInfo = [{
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

const Results = React.memo((props) => {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [toggles, setToggles] = useState(() => 
    columnsInfo.reduce((r, c) => {
      r[c.dataField] = (props.initHidden || [])[c.dataField] ? false : true;
      return r;
    }, {}));
  const [selected, setSelected] = useState([]);
  const [hidden, setHidden] = useState([]);
  const [rowData, setRowData] = useState({});

  const handleSort = useCallback((field, order) => {
    setSortField(field);
    setSortOrder(order);
  }, []);

  const columns = useMemo(() => columnsInfo.map(c => ({...c, onSort: handleSort})), [handleSort]);

  const updateRowData = useCallback((row, data) => {
    setRowData(rowData => ({...rowData, [row.id]: data}));
  }, []);

  const handleColumnToggle = useCallback((columnName) => {
    setToggles(toggles => ({...toggles, [columnName]: !toggles[columnName]}));
  }, []);

  const handleOnSelect = useCallback((row, isSelected) => {
    if (isSelected) {
      setSelected(selected => [...selected, row.id]);
    }
    else {
      setSelected(selected => selected.filter(x => x !== row.id));
    }
  }, []);

  const handleOnSelectAll = useCallback((isSelected, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelected) {
      setSelected(ids);
    }
    else {
      setSelected([]);
    }
  }, []);

  const reset = useCallback(() => {
    handleSort('-', 'asc');
    setHidden([]);
  }, [handleSort]);

  const hideSelected = useCallback(() => {
    if (selected.length > 0) {
      setHidden(hidden => [...hidden, ...selected]);
      setSelected([]);
    }
  }, [selected]);

  const expandRow = {
    // To prevent the hover effect
    className: "bg-white",
    renderer: row => (
      <ResultRow row={ row } update={ updateRowData } data={ rowData[row.id] } />
    )
  };

  const selectRow = {
    mode: 'checkbox',
    clickToExpand: true,
    selected: selected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll
  };

  const buttonsVariant = "outline-secondary";

  return (
    <>
      <ButtonToolbar className="mb-1 mt-2 justify-content-center">
        <ButtonGroup className="mx-2">
          <OverlayTrigger
            placement="top"
            delay={{show: 500}}
            overlay={<Tooltip>Reset the table state</Tooltip>}
          >
            <Button variant={ buttonsVariant } onClick={ reset }>
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
            <Button variant={ buttonsVariant } onClick={ hideSelected } 
              disabled={ !selected.length }
            >
              <IconTrash width="1.3em" height="1.3em"/>
            </Button>
          {/* </OverlayTrigger> */}
        </ButtonGroup>
        <ColumnToggleGroup
          variant={ buttonsVariant }
          columns={ columns }
          onColumnToggle={ handleColumnToggle }
          toggles={ toggles }
        />
      </ButtonToolbar>
      <BootstrapTable
        keyField='id'
        data={ props.data }
        columns={ columns }
        columnToggle={{toggles: toggles}}
        bootstrap4 hover
        rowClasses="result-row"
        // classes="table-borderless"
        bordered={ false }
        headerWrapperClasses="border-0"
        sort={{dataField: sortField, order: sortOrder}}
        hiddenRows={ hidden }
        selectRow={ selectRow }
        expandRow={ expandRow }
      />
    </>
  );
});

export default Results;