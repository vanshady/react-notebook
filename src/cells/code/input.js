'use strict'

import React from 'react'
import Highlight from 'react-highlight'

var CodeCellInput = (props) => (
  <div className='input'>
    <div className='prompt input_prompt'>
      {`In [${props.data.execution_count || ' '}]:`}
    </div>
    <div className='inner_cell'>
      <div className='input_area'>
        <div className='highlight'>
          <Highlight className='python'>
            {props.data.source.join('\n')}
          </Highlight>
        </div>
      </div>
    </div>
  </div>
)

CodeCellInput.propTypes = {
  data: React.PropTypes.object
}

module.exports = CodeCellInput
