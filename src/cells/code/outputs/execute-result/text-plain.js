'use strict'

import React from 'react'

var TextPlain = (props) => (
  <div className='output_text output_subarea output_execute_result'>
    <pre className=''>{props.lines.join('\n')}</pre>
  </div>
)

TextPlain.propTypes = {
  lines: React.PropTypes.array
}

module.exports = TextPlain
