import axios from 'axios'
import React, { Component } from 'react'
import auth from '../common/auth'
import AccountForm from '../components/AccountForm'

class Authenticate extends Component {
  createAccount = async user => {
    try {
      await axios.post('http://localhost:8080/users', { user })
    } catch (err) {
      alert(err)
    }
  }

  render = () => {
    return (
      <div>
        <div>
          <h2>Enter</h2>
          <AccountForm onSubmit={this.createAccount} />
        </div>
      </div>
    )
  }
}

export default Authenticate
