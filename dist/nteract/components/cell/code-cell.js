'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _inputs = require('./inputs');

var _inputs2 = _interopRequireDefault(_inputs);

var _editor = require('./editor');

var _editor2 = _interopRequireDefault(_editor);

var _reactJupyterDisplayArea = require('react-jupyter-display-area');

var _reactJupyterDisplayArea2 = _interopRequireDefault(_reactJupyterDisplayArea);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _actions = require('../../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodeCell = function CodeCell(props, context) {
  function keyDown(e) {
    if (e.key !== 'Enter') {
      return;
    }

    var shiftXORctrl = (e.shiftKey || e.ctrlKey) && !(e.shiftKey && e.ctrlKey);
    if (!shiftXORctrl) {
      return;
    }

    if (e.shiftKey) {
      // TODO: Remove this, as it should be created if at the end of document only
      // this.context.dispatch(createCellAfter('code', props.id));

      // should instead be
      // this.context.dispatch(nextCell(props.id));
    }

    context.dispatch((0, _actions.executeCell)(context.channels, props.id, props.cell.get('source')));
  }

  return _react2.default.createElement(
    'div',
    { className: 'code_cell' },
    _react2.default.createElement(
      'div',
      { className: 'input_area', onKeyDown: keyDown },
      _react2.default.createElement(_inputs2.default, { executionCount: props.cell.get('execution_count') }),
      _react2.default.createElement(_editor2.default, {
        id: props.id,
        input: props.cell.get('source'),
        language: props.language
      })
    ),
    _react2.default.createElement(_reactJupyterDisplayArea2.default, {
      className: 'cell_display',
      outputs: props.cell.get('outputs'),
      displayOrder: props.displayOrder,
      transforms: props.transforms
    })
  );
};

CodeCell.propTypes = {
  cell: _react2.default.PropTypes.any,
  displayOrder: _react2.default.PropTypes.instanceOf(_immutable2.default.List),
  id: _react2.default.PropTypes.string,
  language: _react2.default.PropTypes.string,
  theme: _react2.default.PropTypes.string,
  transforms: _react2.default.PropTypes.instanceOf(_immutable2.default.Map)
};

CodeCell.contextTypes = {
  channels: _react2.default.PropTypes.object,
  dispatch: _react2.default.PropTypes.func
};

exports.default = CodeCell;