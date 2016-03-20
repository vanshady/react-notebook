import React from 'react';
import TextCell from './cells/text';
import CodeCell from './cells/code';
import ErrorCell from './cells/error';

function renderCell(cell, i) {
  const Cell = {
    markdown: TextCell,
    code: CodeCell,
  }[cell.cell_type];

  if (!Cell) {
    return <ErrorCell message={`Cell type not recognized: "${cell.cell_type}"`} />;
  }
  return (
    <Cell
      data={cell}
      key={`ipnyb-cell-${i + 1}`}
    />
  );
}

const Notebook = (props) => (
  <div className="ipynb">{props.data.cells.map(renderCell)}</div>
);

Notebook.propTypes = {
  data: React.PropTypes.object,
};

export default Notebook;
