'use strict'

var React = require('react')
var remark = require('remark')
var reactRenderer = require('remark-react')

var TextCell = (props) => {
  var source = props.data.source
  if (typeof source === 'string' || source instanceof String) {
    source = [source]
  }
  source = source.reduce((text, line) =>
    (text + line.replace(/^(#{1,6})([^#\s])/, '$1 $2'))
  , '')

  return (
    <div className='cell text_cell'>
      <div className='prompt input_prompt'/>
      <div className='inner_cell'>{remark().use(reactRenderer).process(source)}</div>
    </div>
  )
}

TextCell.propTypes = {
  data: React.PropTypes.object
}

module.exports = TextCell
