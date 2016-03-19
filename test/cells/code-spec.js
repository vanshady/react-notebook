/* global describe, it, beforeEach */

'use strict'

import React from 'react'
import { assert } from 'chai'
import { render } from '../util'
import CodeCell from '../../src/cells/code'

import mdcell from '../fixtures/cells/code'

describe('CodeCell', () => {
  var output

  beforeEach(() => {
    output = render(<CodeCell data={mdcell}/>)
  })

  it('generates a div', () => {
    assert.equal(output.type, <div/>.type)
  })

  it('has class "cell code_cell"', () => {
    assert.match(output.props.className, /\bcell code_cell\b/)
  })
})
