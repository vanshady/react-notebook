'use strict';

var React = require('react');
var remark = require('remark');
var reactRenderer = require('remark-react');

var TextCell = function TextCell(props) {
  var source = props.data.source.reduce(function (text, line) {
    return text + line.replace(/^(#{1,6})([^#\s])/, '$1 $2');
  }, '');

  return React.createElement(
    'div',
    { className: 'cell text_cell' },
    React.createElement('div', { className: 'prompt input_prompt' }),
    React.createElement(
      'div',
      { className: 'inner_cell' },
      remark().use(reactRenderer).process(source)
    )
  );
};

TextCell.propTypes = {
  data: React.PropTypes.object
};

module.exports = TextCell;