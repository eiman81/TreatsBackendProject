import { getData, setData, user, channel } from './dataStore';
import { userProfileV1 } from './users';
import { channelExists, userExists, findUser, findChannel, generateMessageId } from './other';
import { messages } from './dataStore';

export interface channeldetails {
  name: string,
  isPublic: boolean,
  ownerMembers: number [],
  allMembers: number []
}

export interface returnMessages {
  messages: messages[]
  start: number,
  end: number
}

export interface messageId {
  messageId: number
}

function channelDetailsV1(token: string, channelId: number) : channeldetails | {error: 'error'} {
/*
< Given a channelId and authUserId, if this user is the member of this channel, return
  basic details about the channel >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>
    <channelId> (<integer>)    - <input channelId>

Exceptions:
Error   -Occurs when
1. channelId does not refer to a valid channel
2. channelId is valid and the authorised user is not a member of the channel

Return Value:
    Returns <name, isPublic, ownerMembers, allMembers> on <all test pass>
*/
  let valid = 0;
  let authUserNum: number;
  for (const user of (getData()).users) {
    if (user.token === token) {
      valid = 1;
      authUserNum = user.uId;
    }
  }

  if (valid === 0) {
    return { error: 'error' };
  } else {
    for (const channel of (getData().channels)) {
      if (channel.channelId === channelId) {
        const members = channel.allMembers;
        if (members.includes(authUserNum)) {
          const channeldetails = {
            name: channel.name,
            isPublic: channel.isPublic,
            ownerMembers: channel.ownerMembers,
            allMembers: channel.allMembers,
          };
          return channeldetails;
        } else {
          return { error: 'error' };
        }
      }
    }
  }
}

/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function channelJoinV1(token: string, channelId: number): {error: 'error'} | {} {
/*
< Given a channelId and authUserId, if this user can join, adds them to that channel >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>
    <channelId> (<integer>)    - <input channelId>

Exceptions:
Error   -Occurs when
1. channelId does not refer to a valid channel.
2. the authorised user is already a member of the channel.
3. channelId refers to a channel that is private and the authorised user
   is not already a channel member and is not a global owner.

Return Value:
    Returns <{}> on <all test pass>
*/
  // check if user id is valid
  // check if channel id is valid
  const store = getData();

  if (userExists(token) && channelExists(channelId)) {
    const profile = findUser(token) as user;
    const channelDetails = findChannel(channelId) as channel;

    if (channelDetails.allMembers.includes(profile.uId)) {
      return { error: 'error' };
    } else if (channelDetails.isPublic === false) {
      return { error: 'error' };
    } else {
      // add user to channel
      let counter = 0;
      for (const channel of getData().channels) {
        if (channel.channelId === channelId) {
          channel.allMembers.push(profile.uId);
          store.channels[counter] = channel;
          setData(store);
          return {};
        }
        counter++;
      }
    }
  } else {
    return { error: 'error' };
  }
}

/// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function channelInviteV1(token: string, channelId: number, uId: number): {error: 'error'} | {} {
/*
< Given the vaild authUserId , vaild channelId and Uid, Once invited, the user is added to the channel immediately.
  In both public and private channels, all members are able to invite users >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>
    <channelId> (<integer>)    - <input channelId>
    <uId> (<integer>)    - <input Uid>

Exceptions:
Error   -Occurs when
1. channelId does not refer to a valid channel.
2. uId does not refer to a valid user.
3. uId refers to a user who is already a member of the channel.
4. channelId is valid and the authorised user is not a member of the channel.

Return Value:
    Returns <{}> on <all test pass>
*/
  if (userExists(token) && channelExists(channelId) && userExists(uId)) {
  // check if user is already in channel and if uId is real
    const user = findUser(token) as user;
    const channel = findChannel(channelId) as channel;
    // already includes user to be added or user is not apart of channel
    if (channel.allMembers.includes(uId) || channel.allMembers.includes(user.uId) === false) {
      return { error: 'error' };
    } else {
      let counter = 0;
      const store = getData();
      for (const channel of getData().channels) {
        if (channel.channelId === channelId) {
          channel.allMembers.push(uId);
          store.channels[counter] = channel;
          setData(store);
          return {};
        }
        counter++;
      }
    }
  } else {
    return { error: 'error' };
  }
}

/// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function channelMessagesV1(token: string, channelId: number, start: number): {error:'error'} | returnMessages {
/*
< Given the vaild authUserId , vaild channelId and the start(whitch message you want start), it return the
  messages between the start and start + 50, if start + 50 more than the recent message, it return the messages
  betwen satrt and the recent message >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>
    <channelId> (<integer>)    - <input channelId>
    <start> (<integer>)    - <input start>

Exceptions:
Error   -Occurs when
1. channelId does not refer to a valid channel.
2. start is greater than the total number of messages in the channel.
3. channelId is valid and the authorised user is not a member of the channel.

Return Value:
    Returns <messages, start, end> on <all test pass>
*/
  let authUserId: number;
  for (const user of getData().users) {
    if (user.token === token) {
      authUserId = user.uId;
      break;
    }
  }
  let found = 0;
  for (const channel of (getData()).channels) {
    if (channel.channelId === channelId) {
      found = 1;
      const members = channel.allMembers;
      if (members.includes(authUserId)) {
        const channelRequested = channel;

        if (start > channelRequested.messages.length || channelRequested.messages.length === undefined) {
          return { error: 'error' };
        } else if (start + 50 >= channelRequested.messages.length) {
          const messages = [];
          let counter = 0;
          for (const message of channelRequested.messages) {
            if (start > counter) {
              counter++;
            } else {
              messages.push(message);
              counter++;
            }
          }

          const returnMessages = {
            messages: messages.reverse(),
            start: start,
            end: -1
          };

          return returnMessages;
        } else {
          const end = start + 50;
          const messages = [];
          let counter = 0;
          for (const message of channelRequested.messages) {
            if (start > counter) {
              counter++;
            } else if (start <= counter && counter <= end) {
              messages.push(message);
              counter++;
            }
          }

          const returnMessages = {
            messages: messages.reverse(),
            start: start,
            end: end
          };

          return returnMessages;
        }
      } else {
        return { error: 'error' };
      }
    }
  }

  if (found === 0) {
    return { error: 'error' };
  }
}

/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function messageSendV1(token: string, channelId: number, message: string): messageId | {error: 'error'} {
  if (userExists(token) && channelExists(channelId)) {
    const channel = findChannel(channelId) as channel;
    const newData = getData();
    let index = 0;
    const user = findUser(token) as user;
   
    if (channel.allMembers.includes(user.uId) === false) {
      return { error: 'error' };
    }
    
    for (const chan of getData().channels) {
      if (chan.channelId === channel.channelId && channel.allMembers.includes(user.uId)) {
        if (message.length < 1000 && message.length !== 0) {
          const newMessage = {
            messageId: generateMessageId(),
            uId: user.uId,
            message: message,
            timeSent: Date.now()
          };
          channel.messages.push(newMessage);
          channel.numberOfMessages = channel.numberOfMessages + 1;
          newData.channels[index] = channel;
          setData(newData);
          const messageId = {
            messageId: newMessage.messageId
          };

          return messageId;
        } else {
          return { error: 'error' };
        }
      }
      index++;
    }

  } else {
    return { error: 'error' };
  }
}

/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function channelLeaveV1(token: string, channelId: number): {error: 'error'} | {} {
  const store = getData();
  if (userExists(token) && channelExists(channelId)) {
    const profile = findUser(token) as user;
    const channelDetails = findChannel(channelId) as channel;

    if (channelDetails.ownerMembers.includes(profile.uId)) {
      let counter = 0;
      for (const channel of getData().channels) {
        if (channel.channelId === channelId) {
          let counter2 = 0;
          let counter3 = 0;
          // delete out of ownermemebr array
          for (const member of channel.ownerMembers) {
            if (member === profile.uId) {
              channel.ownerMembers.splice(counter2, 1);
              break;
            }
            counter2++;
          }
          // delete out of allmember array
          for (const member of channel.allMembers) {
            if (member === profile.uId) {
              channel.allMembers.splice(counter3, 1);
              store.channels[counter] = channel;
              setData(store);
              return {};
            }
            counter3++;
          }
        }

        counter++;
      }
    } else if (channelDetails.allMembers.includes(profile.uId)) {
      let counter = 0;
      for (const channel of getData().channels) {
        if (channel.channelId === channelId) {
          let counter2 = 0;
          for (const member of channel.allMembers) {
            if (member === profile.uId) {
              channel.allMembers.splice(counter2, 1);
              store.channels[counter] = channel;
              setData(store);
              return {};
            }
            counter2++;
          }
        }
        counter++;
      }
    } else {
      return { error: 'error' };
    }
  } else {
    return { error: 'error' };
  }
}

/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function channelAddOwnerV1(token: string, channelId: number, uId: number): {error: 'error'} | {} {
  const store = getData();
  if (userExists(token) && userExists(uId) && channelExists(channelId)) {
    const channelDetails = findChannel(channelId) as channel;
    if (channelDetails.ownerMembers.includes(uId) || !(channelDetails.allMembers.includes(uId))) {
      return { error: 'error' };
    } else {
      let counter = 0;
      for (const channel of getData().channels) {
        if (channel.channelId === channelId) {
          channel.ownerMembers.push(uId);
          store.channels[counter] = channel;
          setData(store);
          return {};
        }
        counter++;
      }
    }
  } else {
    return { error: 'error' };
  }
}

/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function channelRemoveOwnerV1(token: string, channelId: number, uId: number): {error: 'error'} | {} {
  const store = getData();
  if (userExists(token) && userExists(uId) && channelExists(channelId)) {
    const channelDetails = findChannel(channelId) as channel;
    const user = findUser(token) as user;
    if (channelDetails.ownerMembers.includes(uId) && channelDetails.ownerMembers.includes(user.uId) && channelDetails.ownerMembers.length > 1) {
      let counter = 0;
      for (const channel of getData().channels) {
        if (channel.channelId === channelId) {
          let counter2 = 0;
          for (const member of channel.ownerMembers) {
            if (member === uId) {
              channel.ownerMembers.splice(counter2, 1);
              store.channels[counter] = channel;
              setData(store);
              return {};
            }
            counter2++;
          }
        }
        counter++;
      }
    } else {
      return { error: 'error' };
    }
  } else {
    return { error: 'error' };
  }
}

/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function messageEditV1(token: string, messageId: number, message: string): {} | {error: 'error'} {
  if (userExists(token)) {
    let index = 0;
    let index1 = 0;
    const found = 0;
    const user = findUser(token) as user;
    for (const channel of getData().channels) {
      for (const mes of channel.messages) {
        if (mes.messageId === messageId) {
          if (mes.uId === user.uId || channel.ownerMembers.includes(user.uId)) {
            const newMessage = mes;
            if (message.length <= 1000 && message !== '') {
              newMessage.message = message;
              const newData = getData();
              newData.channels[index].messages[index1] = newMessage;
              setData(newData);
              return {};
            } else if (message === '') {
              const newData = getData();
              newData.channels[index].messages.splice(index1, 1);
              newData.channels[index].numberOfMessages = newData.channels[index].numberOfMessages - 1;
              setData(newData);
              return {};
            }
          } else {
            return { error: 'error' };
          }
        }
        index1++;
      }
      index++;
    }

    if (found === 0) {
      return { error: 'error' };
    }
  }
}

/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function messageRemoveV1(token: string, messageId: number): {} | {error: 'error'} {
  if (userExists(token)) {
    let index = 0;
    let index1 = 0;
    const found = 0;
    const user = findUser(token) as user;
    for (const channel of getData().channels) {
      for (const mes of channel.messages) {
        if (mes.messageId === messageId) {
          if (mes.uId === user.uId || channel.ownerMembers.includes(user.uId)) {
            const newData = getData();
            newData.channels[index].messages.splice(index1, 1);
            newData.channels[index].numberOfMessages = newData.channels[index].numberOfMessages - 1;
            setData(newData);
            return {};
          } else {
            return { error: 'error' };
          }
        }
        index1++;
      }
      index++;
    }

    if (found === 0) {
      return { error: 'error' };
    }
  }
}

export { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1, channelLeaveV1, channelAddOwnerV1, channelRemoveOwnerV1, messageSendV1, messageEditV1, messageRemoveV1 };
