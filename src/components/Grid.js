import React from 'react'
import ReactDataGrid from 'react-data-grid'
import faker from 'faker'
import update from 'immutability-helper'
import { ToolsPanel, Toolbar, Data, Editors, Formatters, Draggable, Filters } from 'react-data-grid-addons'
const { GroupedColumnsPanel } = ToolsPanel
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors
const { DropDownFormatter } = Formatters
const { Container: DraggableContainer } = Draggable
const { NumericFilter, AutoCompleteFilter } = Filters

// require('../../lib/assets/css/bootstrap.min.css')
require('./grid.css')

faker.locale = 'ru'

// options for priorities autocomplete editor
const priorities = [
  { id: 0, title: 'Critical' },
  { id: 1, title: 'High' },
  { id: 2, title: 'Medium' },
  { id: 3, title: 'Low' }
]
const PrioritiesEditor = <AutoCompleteEditor options={priorities} />

// options for IssueType dropdown editor
// these can either be an array of strings, or an object that matches
// the schema below.
const issueTypes = [
  { id: 'bug', value: 'bug', text: 'Bug', title: 'Bug' },
  { id: 'improvement',
    value: 'improvement',
    text: 'Improvement',
    title: 'Improvement' },
  { id: 'epic', value: 'epic', text: 'Epic', title: 'Epic' },
  { id: 'story', value: 'story', text: 'Story', title: 'Story' }
]
const IssueTypesEditor = <DropDownEditor options={issueTypes}/>

const IssueTypesFormatter = <DropDownFormatter options={issueTypes}/>

const CustomToolbar = React.createClass({
  propTypes: {
    groupBy: React.PropTypes.array.isRequired,
    onColumnGroupAdded: React.PropTypes.func.isRequired,
    onColumnGroupDeleted: React.PropTypes.func.isRequired
  },

  render () {
    return (
      <Toolbar enableFilter={true} onToggleFilter={this.props.onToggleFilter} /* <- transmitted by ReactDataGrid */ filterRowsButtonText="Фильтр">
      <GroupedColumnsPanel groupBy={this.props.groupBy}
        onColumnGroupAdded={this.props.onColumnGroupAdded}
        onColumnGroupDeleted={this.props.onColumnGroupDeleted}
        noColumnsSelectedMessage="Перетащи колонку сюда для группировки"
        panelDescription="Перетащи еще" />
      </Toolbar>
    )
  }
})

const Grid = React.createClass({
  getInitialState () {
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        width: 80,
        resizable: true,
        locked: true,
        filterable: true,
        filterRenderer: NumericFilter
      },
      {
        key: 'task',
        name: 'Title',
        // width: 200,
        editable: true,
        resizable: true,
        filterable: true,
        sortable: true,
        draggable: true
      },
      {
        key: 'priority',
        name: 'Priority',
        // width: 200,
        editor: PrioritiesEditor,
        resizable: true,
        filterable: true,
        filterRenderer: AutoCompleteFilter,
        sortable: true,
        draggable: true
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        // width: 200,
        editor: IssueTypesEditor,
        formatter: IssueTypesFormatter,
        resizable: true,
        filterable: true,
        filterRenderer: AutoCompleteFilter,
        sortable: true,
        draggable: true
      },
      {
        key: 'complete',
        name: '% Complete',
        // width: 200,
        resizable: true,
        filterable: true,
        filterRenderer: NumericFilter,
        sortable: true,
        draggable: true
      },
      {
        key: 'startDate',
        name: 'Start Date',
        // width: 200,
        resizable: true,
        filterable: true,
        sortable: true,
        draggable: true
      },
      {
        key: 'completeDate',
        name: 'Expected Complete',
        // width: 200,
        resizable: true,
        filterable: true,
        sortable: true,
        draggable: true
      },
      {
        key: 'c2',
        name: 'Expected Complete',
        // width: 200,
        resizable: true,
        filterable: true,
        sortable: true,
        draggable: true
      },
      {
        key: 'c3',
        name: 'Expected Complete',
        // width: 200,
        resizable: true,
        filterable: true,
        sortable: true,
        draggable: true
      },
      {
        key: 'c3',
        name: 'Expected Complete',
        width: 200,
        resizable: true,
        filterable: true,
        sortable: true,
        draggable: true
      }
    ]

    return {
      rows: this.createRows(1000),
      filters: {},
      sortColumn: null,
      sortDirection: null,
      groupBy: [],
      expandedRows: {}
    }
  },

  getRandomDate (start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ).toLocaleDateString()
  },

  createRows (numberOfRows) {
    let rows = []
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        task: 'Task ' + i,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      })
    }
    return rows
  },

  getRows () {
    return Data.Selectors.getRows(this.state)
  },

  getSize () {
    return this.getRows().length
  },

  rowGetter (rowIdx) {
    const rows = this.getRows()
    return rows[rowIdx]
  },

  handleGridSort (sortColumn, sortDirection) {
    this.setState({ sortColumn: sortColumn, sortDirection: sortDirection })
  },

  handleFilterChange (filter) {
    let newFilters = Object.assign({}, this.state.filters)
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter
    } else {
      delete newFilters[filter.column.key]
    }

    this.setState({ filters: newFilters })
  },

  getValidFilterValues (columnId) {
    let values = this.state.rows.map(r => r[columnId])
    return values.filter((item, i, a) => { return i === a.indexOf(item) })
  },

  onClearFilters () {
    this.setState({ filters: {} })
  },

  handleGridRowsUpdated ({ fromRow, toRow, updated }) {
    let rows = this.state.rows.slice()

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i]
      let updatedRow = update(rowToUpdate, {$merge: updated})
      rows[i] = updatedRow
    }

    this.setState({ rows })
  },

  onColumnGroupAdded (colName) {
    let columnGroups = this.state.groupBy.slice(0)
    if (columnGroups.indexOf(colName) === -1) {
      columnGroups.push(colName)
    }
    this.setState({groupBy: columnGroups})
  },

  onColumnGroupDeleted (name) {
    let columnGroups = this.state.groupBy.filter(function (g) { return g !== name })
    this.setState({groupBy: columnGroups})
  },

  onRowExpandToggle ({ columnGroupName, name, shouldExpand }) {
    let expandedRows = Object.assign({}, this.state.expandedRows)
    expandedRows[columnGroupName] = Object.assign({}, expandedRows[columnGroupName])
    expandedRows[columnGroupName][name] = {isExpanded: shouldExpand}
    this.setState({expandedRows: expandedRows})
  },

  onHeaderDrop (source, target) {
    const stateCopy = Object.assign({}, this.state)
    const columnSourceIndex = this.state.columns.findIndex(
      i => i.key === source
    )
    const columnTargetIndex = this.state.columns.findIndex(
      i => i.key === target
    )

    stateCopy.columns.splice(
      columnTargetIndex,
      0,
      stateCopy.columns.splice(columnSourceIndex, 1)[0]
    )

    const emptyColumns = Object.assign({}, this.state, { columns: [] })
    this.setState(
      emptyColumns
    )

    const reorderedColumns = Object.assign({}, this.state, { columns: stateCopy.columns })
    this.setState(
      reorderedColumns
    )
  },

  render () {
    return (
      <DraggableContainer
        onHeaderDrop={this.onHeaderDrop}>
        <ReactDataGrid
          onGridSort={this.handleGridSort}
          enableCellSelect={true}
          enableRowSelect={true}
          enableDragAndDrop={true}
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.getSize()}
          minHeight={500}
          toolbar={<CustomToolbar
            groupBy={this.state.groupBy}
            onColumnGroupAdded={this.onColumnGroupAdded}
            onColumnGroupDeleted={this.onColumnGroupDeleted}/>}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          onAddFilter={this.handleFilterChange}
          getValidFilterValues={this.getValidFilterValues}
          onClearFilters={this.onClearFilters}
          onRowExpandToggle={this.onRowExpandToggle} />
      </DraggableContainer>
    )
  }
})

export default Grid
