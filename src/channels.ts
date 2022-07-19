import { getData, setData } from './dataStore';

export interface channels {
  channelId: number,
  name: string
}

export interface channelId {
  channelId: number;
}

function channelsCreateV1(token: string, name: string, isPublic: boolean): {error: 'error'} | channelId {
/*
< Given a authUserId, the channel name and choose whether it is public, creates a new channel with the given name.
  The user who created it automatically joins the channel >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>
    <name> (<string>)    - <input naem>
    <isPublic> (<bool>)    - <input isPublic>

Exceptions:
Error   -Occurs when
1. length of name is less than 1 or more than 20 characters.

Return Value:
    Returns <channelId> on <all test pass>
*/
  const data = getData();
  if (isPublic !== false && isPublic !== true) {
    return { error: 'error' };
  }

  let userIndex: number;

  if (name.length < 1 || name.length > 20) {
    return { error: 'error' };
  }
  let tokenMatched = false;

  for (let i = 0; i < data.users.length; i++) {
    if (token == data.users[i].token) {
      tokenMatched = true;
      userIndex = i;
      break;
    }
  }
  if (tokenMatched === false) {
    return { error: 'error' }
  }

  let count = 0;
  for (let i = 0; i < data.channels.length; i++) {
    if (name === data.channels[i].name.slice(0, name.length)) {
      count++;
    }
  }
  if (count > 0) {
    name = name + (count - 1).toString();
  }

  let highest = 995;
  for (let i = 0; i < data.channels.length; i++) {
    if (data.channels[i].channelId >= highest) {
      highest = data.channels[i].channelId;
    }
  }
  const authUserNum = data.users[userIndex].uId;
  const channelId = highest + 5;
  data.channels.push({
    channelId: channelId,
    name: name,
    latestMsg: null,
    numberOfMessages: 0,
    messages: [],
    isPublic: isPublic,
    ownerMembers: [authUserNum],
    allMembers: [authUserNum]
  });

  setData(data);
  return {
    channelId: channelId,
  };
}

function channelsListV1(token: string): {error: 'error'} | channels[] {
  const data = getData();
  const channels = [];
  let tokenMatched = false;
  let authUserId: number;
  for (let i = 0; i < data.users.length; i++) {
    if (token === data.users[i].token) {
      tokenMatched = true;
      authUserId = data.users[i].uId;
      break;
    }
  }
  if (tokenMatched === false) {
    return { error: 'error' };
  }

  for (let c = 0; c < data.channels.length; c++) {
    for (let i = 0; i < data.channels[c].allMembers.length; i++) {
      if (data.channels[c].allMembers[i] === authUserId) {
        const channel = {
          channelId: data.channels[c].channelId,
          name: data.channels[c].name
        };
        channels.push(channel);
      }
    }
  }
  return channels;
}

function channelsListallV1(token: string): {error: 'error'} | channels[] {
/*
< Given a authUserId, Provide an array of all channels, including private channels, (and their associated details) >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>

Exceptions:
Error   -Occurs when

Return Value:
    Returns <channels> on <all test pass>
*/
  const data = getData();
  let valid = 0;
  const channels: channels[] = [];
  for (const user of data.users) {
    if (user.token === token) {
      valid = 1;
      for (const channel of data.channels) {
        const channeldetails = {
          channelId: channel.channelId,
          name: channel.name
        };
        channels.push(channeldetails);
      }
      return channels;
    }
  }

  if (valid === 0) {
    return channels;
  }
}

export { channelsCreateV1, channelsListV1, channelsListallV1 };
