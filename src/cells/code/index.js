'use strict'

import React from 'react'
import CodeCellInput from './input'
import CodeCellOutputs from './outputs'

var CodeCell = (props) => (
  <div className='cell code_cell'>
    <CodeCellInput data={props.data}/>
    <CodeCellOutputs outputs={props.data.outputs}/>
  </div>
)

CodeCell.propTypes = {
  data: React.PropTypes.object
}

module.exports = CodeCell
