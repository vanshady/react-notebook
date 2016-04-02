/* global describe, it, beforeEach */

'use strict'

import React from 'react'
import { assert } from 'chai'
import { render } from './util'
import Notebook from '../src'

import sampleNotebook from './fixtures/notebook1.ipynb'

describe('Notebook', () => {
  var output

  beforeEach(() => {
    output = render(<Notebook content={sampleNotebook}/>)
  })

  it('generates a notebook component', () => {
  })
})
