/* global describe, it, beforeEach */

'use strict'

import React from 'react'
import { assert } from 'chai'
import { render } from './util'
import IPythonNotebook from '../src'

import sampleNotebook from './fixtures/notebook1.ipynb'

describe('IPythonNotebook', () => {
  var output

  beforeEach(() => {
    output = render(<IPythonNotebook data={sampleNotebook}/>)
  })

  it('generates a notebook component', () => {
    assert.equal(output.type, <div/>.type)
  })

  it('has the correct number of cells', () => {
    assert.equal(output.props.children.length, 8)
  })

  it('has class "ipynb"', () => {
    assert.match(output.props.className, /\bipynb\b/)
  })
})
