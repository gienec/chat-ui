import React, { Component } from 'react'
import { css } from 'emotion'

class UserList extends Component {
  state = { userIds: [] }

  async componentDidMount () {

  }

  render = () => {
    return (
      <ul>
        {this.state.userIds
          .filter(uid => uid.includes(this.props.searchTerm))
          .map(uid => (
            <li key={uid}>
              <button
                onClick={() => this.props.onClick(uid)}
                className={css({ padding: 10, margin: 10 })}
              >
                Start conversation with <strong>{uid}</strong>
              </button>
            </li>
          ))}
      </ul>
    )
  }
}
export default UserList
