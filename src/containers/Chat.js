import React, { Component } from 'react'
import _ from 'lodash'
import { HubConnectionBuilder } from '@aspnet/signalr'

import ChannelList from '../components/ChannelList'
import MessageList from '../components/MessageList'
import NewMessageForm from '../components/NewMessageForm'
import UserList from './UserList'
import { css } from 'emotion'

const connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5000/chat")
    .build()

class Chat extends Component {
  state = {
    channels: [],
    currentChannel: { messages:[] },
    searchTerm: ''
  }

  userName = 'Random User v' + Math.floor(Math.random() * (99999 - 10000 + 1)) + 1000

  connect = async () => {

    connection.start()
    .then(() => {
      console.log('Connection started!')

      connection.on("receive-message", this.processMessage)
      connection.on("receive-channel", channel => {
        this.setState({
          currentChannel: channel
        })
      })


      connection.invoke("GetUserChannels")
    })
    .catch(err => console.log('Error while establishing connection'))

    this.setState({ currentUser: {id: this.userName, channels:[]}, currentChannel: {messages:[]}})    
  }

  subscribeToAllChannels = async () => {
    
  }

  subscribeToChannel = channel => {
    
  }

  processMessage = message => {
    let { currentChannel } = this.state

    currentChannel.messages = [...currentChannel.messages, message]
    this.setState( { currentChannel: currentChannel } )
  }

  startChannel = async id => {
    
  }

  sendMessage = async text => { 
    connection.invoke("SendMessage",
     {
      channelId: "lobby",
      userName: this.userName,
      text: text
    })
  }

  componentDidMount = async () => {
    await this.connect()
  }

  render = () => {
    if (this.state.currentChannel === null) {
      return <p>Loading..</p>
    }
    return (
      <div
        className={css({
          background: 'white',
          maxWidth: 1010,
          margin: '0 auto'
        })}
      >
        <header
          className={css({
            padding: 16,
            fontSize: '1em',
            background: '#00DE72',
            color: 'white',
            fontWeight: 300
          })}
        />
        <div className={css({ display: 'flex', height: '95vh' })}>
          <aside
            className={css({
              minWidth: '30%',
              display: 'flex',
              flexDirection: 'column',
              borderRight: '2px solid #E9EBED'
            })}
          >
            <div
              className={css({
                display: 'flex',
                padding: 16
              })}
            >
              <input
                type="text"
                value={this.state.searchTerm}
                placeholder="Search"
                className={css({
                  padding: 12,
                  width: '100%',
                  backgroundColor: '#F2F2F2',
                  border: '1px solid #F2F2F2'
                })}
                onChange={e => {
                  this.setState({ searchTerm: e.target.value })
                }}
              />
            </div>
            {this.state.searchTerm ? (
              <UserList
                onClick={this.startChannel}
                searchTerm={this.state.searchTerm}
              />
            ) : null}
            {!this.state.searchTerm && this.state.channels ? (
              <ChannelList
                onChannelSelected={this.startChannel}
                currentChannel={this.state.currentChannel}
                channels={this.state.channels}
              />
            ) : null}
          </aside>
          <main
            className={css({
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              paddingTop: 25,
              paddingBottom: 30
            })}
          >
            <MessageList
              messages={this.state.currentChannel.messages}
            />
            <NewMessageForm onSubmit={this.sendMessage} />
          </main>
        </div>
      </div>
    )
  }
}
export default Chat
