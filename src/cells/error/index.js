import React from 'react'

const ErrorCell = (props) => (
  <div className='cell error_cell'>
    {props.message}
  </div>
)

module.exports = ErrorCell
