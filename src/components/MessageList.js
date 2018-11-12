import React, { Component } from 'react'
import { css } from 'emotion'
import Avatar from './Avatar'
import _ from 'lodash'

const Message = ({ message }) => (
  <li
    className={css({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 9,
      paddingBottom: 9
    })}
  >
    <Avatar
      userId={message.userName}
      className={css({
        width: 32,
        height: 32,
        marginRight: 6
      })}
    />
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column'
      })}
    >
      <span
        className={css({
          fontSize: '.8em',
          fontWeight: 'bold',
          marginBottom: 2
        })}
      >
        {message.userName}
      </span>
      <span className={css({ flex: 1, fontSize: '.8em' })}>
        {message.text}
      </span>
    </div>
  </li>
)

class MessageList extends Component {
  scrollToBottom = () => {
    this.node.scrollTop = this.node.scrollHeight
  }

  componentDidUpdate () {
    const shouldScrollToBottom =
      this.node.scrollTop + this.node.clientHeight + 100 >=
      this.node.scrollHeight
    if (shouldScrollToBottom) {
      this.scrollToBottom()
    }
  }

  componentDidMount () {
    this.scrollToBottom()
  }

  render () {
    return (
      <ul
        ref={node => (this.node = node)}
        className={css({
          overflowY: 'scroll',
          paddingLeft: 60,
          paddingRight: 60
        })}
      >
        {this.props.messages.sort((a, b) => a.timestamp - b.timestamp).map(message => (
          <Message message={message} key={message.timestamp} />
        ))}
      </ul>
    )
  }
}

export default MessageList
