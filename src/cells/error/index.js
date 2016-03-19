'use strict'

var React = require('react')

var ErrorCell = (props) => (
  <div className='cell error_cell'>
    {props.message}
  </div>
)

module.exports = ErrorCell
