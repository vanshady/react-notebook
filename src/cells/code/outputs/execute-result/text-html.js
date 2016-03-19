'use strict'

import React from 'react'

var TextHTML = (props) => (
  <div className='output_html rendered_html output_subarea output_execute_result' dangerouslySetInnerHTML={{__html: props.lines.join('\n')}}/>
)

TextHTML.propTypes = {
  lines: React.PropTypes.array
}

module.exports = TextHTML
