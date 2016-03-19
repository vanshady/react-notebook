'use strict'

var React = require('react')
var TextCell = require('./cells/text')
var CodeCell = require('./cells/code')
// var RawCell = require('./cells/raw')
var ErrorCell = require('./cells/error')

function renderCell (cell, i) {
  var Cell = {
    markdown: TextCell,
    code: CodeCell
    // raw: RawCell
  }[cell.cell_type]

  if (!Cell) {
    return <ErrorCell message={`Cell type not recognized: "${cell.cell_type}"`}/>
  } else {
    return (
      <Cell
        data={cell}
        key={`ipnyb-cell-${i + 1}`}
      />
    )
  }
}

class IPythonNotebook extends React.Component {
  render () {
    return (
      <div className='ipynb'>{this.props.data.cells.map(renderCell)}</div>
    )
  }
}

IPythonNotebook.propTypes = {
  data: React.PropTypes.object
}

export default IPythonNotebook
