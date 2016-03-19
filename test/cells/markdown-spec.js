/* global describe, it, beforeEach, xit */

'use strict'

import React from 'react'
import { assert } from 'chai'
import { render } from '../util'
import MarkdownCell from '../../src/cells/text'

import mdcell from '../fixtures/cells/markdown'

describe('MarkdownCell', () => {
  var output

  beforeEach(() => {
    output = render(<MarkdownCell data={mdcell}/>)
  })

  it('generates a div', () => {
    assert.equal(output.type, <div/>.type)
  })

  it('has class "cell text_cell"', () => {
    assert.match(output.props.className, /\bcell text_cell\b/)
  })

  // Using a different markdown library that doesn't use dangerouslySetInnerHTML,
  // so this isn't quite the right test:
  xit('renders the markdown content', () => {
    var expectedOutput = {__html: '<h1>test</h1>\n<p>$$y = x$$</p>\n'}
    console.log(output)
    assert.deepEqual(output.props.dangerouslySetInnerHTML, expectedOutput)
  })
})
