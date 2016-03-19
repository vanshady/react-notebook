'use strict'

import React from 'react'

var TextHTML = (props) => {
  var lines = props.lines
  if (typeof lines === 'string' || lines instanceof String) {
    lines = [lines]
  }

  return (
    <div className='output_html rendered_html output_subarea output_execute_result' dangerouslySetInnerHTML={{__html: lines.join('\n')}}/>
  )
}

TextHTML.propTypes = {
  lines: React.PropTypes.any
}

module.exports = TextHTML
