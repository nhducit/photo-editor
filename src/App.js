import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import 'cropperjs/dist/cropper.css'
import PhotoEditor from './PhotoEditor'
class App extends Component {
  render() {
    return (
      <div className="App">
        <PhotoEditor />
      </div>
    )
  }
}

export default App
