import React from 'react'
import { css } from 'emotion'
import Avatar from './Avatar'

const MessagePeek = ({ channel }) => {
  if (channel.messages.length > 0) {
    const message = channel.messages[channel.messages.length - 1]
    return (
      <div className={css({ fontSize: '.7em' })}>
        <span>{message.senderId.toLowerCase()}: </span>
        <span>{message.text.substring(0, 20).toLowerCase()}</span>
      </div>
    )
  }
  return null
}

const Channel = ({ channel, currentChannel, onChannelSelected }) => (
  <li
    className={css({
      padding: 16,
      cursor: 'pointer',
      color:
        currentChannel && currentChannel.Id === channel.Id
          ? 'white'
          : null,
      background:
        currentChannel && currentChannel.Id === channel.Id
          ? '#00DE72'
          : null,
      '&:hover': {
        background:
          currentChannel && currentChannel.Id === channel.Id
            ? null
            : '#F2F6FA'
      }
    })}
    onClick={() => onChannelSelected(channel.theirId)}
  >
    <div
      className={css({
        display: 'flex',
        alignItems: 'center'
      })}
    >
      <Avatar
        userId={channel.theirId}
        className={css({
          width: 36,
          height: 36,
          marginRight: 12
        })}
      />

      <div>
        <div className={css({ marginBottom: 3 })}>
          <span
            className={css({
              fontWeight: 600,
              fontSize: '.8em'
            })}
          >
            {channel.theirId}
          </span>
        </div>
        <MessagePeek channel={channel} />
      </div>
    </div>
  </li>
)

const ChannelList = ({
  channels,
  currentChannel,
  onChannelSelected
}) => (
  <ul className={css({ overflowY: 'scroll' })}>
    {channels.map(channel => (
      <Channel
        channel={channel}
        key={channel.Id}
        currentChannel={currentChannel}
        onChannelSelected={onChannelSelected}
      />
    ))}
  </ul>
)

export default ChannelList
