'use strict'

// This uses react shallow rendering to render the requested jsx.
// See: https://facebook.github.io/react/docs/test-utils.html#shallow-rendering

import TestUtils from 'react-addons-test-utils'

export function render (jsx) {
  var renderer = TestUtils.createRenderer()
  renderer.render(jsx)
  return renderer.getRenderOutput()
}

