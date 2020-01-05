import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component{
  constructor() {
    super()

  }
  getSuppliers() {
    axios.get('/api/suppliers')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    this.getSuppliers()
    return (
      <>
      <h1>Hello World</h1>
      </>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)