import React, { Component } from 'react'

class AccountForm extends Component {
  render = () => (
    <form
      onSubmit={e => {
        e.preventDefault()
        this.props.onSubmit({
          username: this.usernameEl.value,
        })
        this.usernameEl.value = ''
      }}
    >
      <input type="submit" />
    </form>
  )
}

export default AccountForm
