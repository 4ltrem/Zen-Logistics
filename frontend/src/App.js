import React, { Component } from 'react'
import Modal from './components/Modal'
import axios from 'axios'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      viewCompleted: false,
      itemList: [],
      modal: false,
      activeItem: {
        title: '',
        description: '',
        typeProduit: '',
        stock: 0,
        minimumStock: 0,
        enAchat: false,
      }
    }
  }

  componentDidMount () {
    this.refreshList()
  }

  refreshList = () => {
    axios
      .get('/api/items/')
      .then(res => this.setState({ itemList: res.data }))
      .catch(err => console.log(err))
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }

  handleSubmit = item => {
    this.toggle()

    console.log(item.title + ' enAchat:' + item.enAchat + ' Stock:' + item.stock + ' minimumStock:' + item.minimumStock)

    if (item.stock < item.minimumStock) {
      item.enAchat = true
    }
    else {
      item.enAchat = false
    }

    if (item.id) {
      axios
        .put(`/api/items/${item.id}/`, item)
        .then(res => this.refreshList())
      return
    }

    axios
      .post('/api/items/', item)
      .then(res => this.refreshList())
  }

  handleDelete = item => {
    axios
      .delete(`/api/items/${item.id}/`)
      .then(res => this.refreshList())
  }

  createItem = () => {
    const item = { 
      title: '',
      description: '',
      typeProduit: '',
      stock: 0,
      minimumStock: 0,
      enAchat: false ,
    }
    this.setState({ activeItem: item, modal: !this.state.modal })
  }

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal })
  }

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true })
    }

    return this.setState({ viewCompleted: false })
  }

  renderTabList = () => {
    return (
      <div className='nav nav-tabs'>
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? 'nav-link active' : 'nav-link'}
        >
          Needs Restock
        </span>

        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? 'nav-link' : 'nav-link active'}
        >
          In Stock
        </span>
      </div>
    )
  }

  renderItems = () => {
    const { viewCompleted } = this.state

    const newItems = this.state.itemList.filter(
      item => item.enAchat === viewCompleted
    )

    return newItems.map(item => (
      <li
        key={item.id}
        className='list-group-item d-flex justify-content-between align-items-center'
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? 'completed-todo' : ''
          }`}
          title={item.description}
        >
          {item.title}
        </span>

        <span>
          <button
            className='btn btn-secondary mr-2'
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>

          <button
            className='btn btn-danger'
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ))
  }

  render () {
    return (
      <main className='container'>
        <h1 className='text-grey text-uppercase text-center my-4'>Inventory Management</h1>

        <div className='row'>
          <div className='col-md-6 col-sm-10 mx-auto p-0'>
            <div className='card p-3'>
              <div className='mb-4 text-center'>
                <button className='btn btn-primary' onClick={this.createItem}>
                  Add item
                </button>
              </div>

              {this.renderTabList()}

              <ul className='list-group list-group-flush border-top-0'>
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>

        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    )
  }
}

export default App
