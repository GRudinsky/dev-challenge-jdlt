import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.scss'

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      suppliers: null,
      products: []
    }
    this.getProducts = this.getProducts.bind(this)
    this.handleMultiSelect = this.handleMultiSelect.bind(this)
  }

  getSuppliers() {
    axios.get('/api/suppliers')
      .then(res => this.setState({ suppliers: res.data }))
      .catch(err => console.log(err))
  }

  getProducts(selected) {
    this.setState({ filteredProducts: null, multiSelectData: null })
    axios.get(`/api/suppliers/${selected.value}`)
      .then(res => this.setState({ products: res.data.products }))
      .catch(err => console.log(err))
  }

  displayOptions(arr) {
    return arr.map(element => ({ 'value': element._id, 'label': element.name }))
  }

  handleMultiSelect(selected) {
    const products = selected ? selected.map(item => item.value) : []
    const multiSelectData = { ...this.state.multiSelelectData, products }
    this.setState({ multiSelectData }, this.filterProducts)
  }

  filterProducts() {
    const filteredProducts = this.state.products.filter(product => this.state.multiSelectData.products.includes(product._id))
    this.setState({ filteredProducts })
  }

  componentDidMount() {
    this.getSuppliers()
  }
  render() {
    if (!this.state.suppliers) return null
    const { suppliers, products, filteredProducts } = this.state
    const { getProducts, displayOptions, handleMultiSelect } = this
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-md-12 main">
              <h1 className="page-header">Product pricing</h1>
              <form>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="selSupplier">Supplier</label>
                    <Select name="selSupplier"
                      options={displayOptions(suppliers)}
                      onChange={getProducts}
                    />
                  </div>
                  {products[0] && 
                  <div className="form-group col-md-6">
                    <label htmlFor="selProduct">Product</label>
                    <Select 
                      options={displayOptions(products)}
                      isMulti
                      onChange={handleMultiSelect}
                    />
                  </div>
                  }
                </div>
              </form>
              {}
              {filteredProducts && 
              <div>
                <h2 className="sub-header">Product details</h2>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Supplier</th>
                        <th>Product</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts && (
                        filteredProducts.map(el => (
                          <tr 
                            key={filteredProducts.indexOf(el)}
                          >
                            <td>{filteredProducts.indexOf(el) + 1}</td>
                            <td>{this.state.suppliers.filter(sup =>sup.id === el.supplier).map(el => el.name)}</td>
                            <td>{el.name}</td>
                            <td>{el.price}</td>
                          </tr>
                        )))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              }
            </div>
          </div>
        </div>
      </>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)