'use strict'

var css = require("!style!css!sass!../css/style.scss");

import React from 'react'
import ReactDOM from 'react-dom'
import IPythonNotebook from '../../../src'

import data from './data'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.createFileReader()
    this.state = {data: JSON.stringify(data)}
  }

  createFileReader () {
    this.reader = new FileReader()
    this.reader.addEventListener('loadend', () => {
      this.setState({data: this.reader.result})
    })
  }

  handleFileChange () {
    var input = this.refs['ipynb-file']
    if (input.files[0]) this.reader.readAsText(input.files[0])
  }

  handleInputChange (event) {
    this.setState({data: event.target.value})
  }

  renderNotebook () {
    var json
    try {
      json = JSON.parse(this.state.data)
    } catch (e) {
      json = undefined
    }

    if (this.state.data && json) {
      return (
        <IPythonNotebook data={json}/>
      )
    }
  }

  renderInputForm () {
    return (
      <form>
        <label htmlFor="ipynb-file">
          File:
          <input type="file" name="ipynb-file" ref="ipynb-file" id="ipynb-file" onChange={this.handleFileChange.bind(this)}/>
        </label>
        <textarea name="ipynb-input" onChange={this.handleInputChange.bind(this)} value={this.state.data}/>
      </form>
    )
  }

  render () {
    return (
      <div>
        { this.renderInputForm() }
        { this.renderNotebook() }
      </div>
    )
  }
}

ReactDOM.render(React.createElement(App, {}), document.getElementById('ipynb-reader'))
