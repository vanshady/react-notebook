import React from 'react'

const TextPlain = (props) => {
  let lines = props.lines
  if (typeof lines === 'string' || lines instanceof String) {
    lines = [lines]
  }

  return (
    <div className='output_text output_subarea output_execute_result'>
      <pre className=''>{lines.join('\n')}</pre>
    </div>
  )
}

TextPlain.propTypes = {
  lines: React.PropTypes.any
}

module.exports = TextPlain
