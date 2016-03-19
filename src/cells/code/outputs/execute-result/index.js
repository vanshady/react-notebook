'use strict'

import React from 'react'
import TextPlain from './text-plain'
import TextHTML from './text-html'

function renderData (data, i) {
  if (data['text/html']) {
    // If raw html provided, prefer that:
    return <TextHTML lines={data['text/html']}/>
  } else if (data['text/plain']) {
    // Otherwise, if plain text, render that:
    return <TextPlain lines={data['text/plain']}/>
  }
}

var ExecuteResult = (props) => (
  <div className='output' key={props.key}>
    <div className='output_area'>
      <div className='prompt output_prompt'>Out[11]:</div>
      {renderData(props.data)}
    </div>
  </div>
)

ExecuteResult.propTypes = {
  data: React.PropTypes.object
}

module.exports = ExecuteResult
