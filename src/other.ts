import { NewLineKind } from 'typescript';
import { getData, setData, data, user, channel } from './dataStore'
interface nodata {}

function clearV1(): nodata {
/*
< Resets the internal data of the application to its initial state >

Arguments:

Exceptions:

Return Value:
    Returns <{}> on <all test pass>
*/
  const data: data = {
    users: [],
    channels: [],
  };
  const nodata = {};
  setData(data);
  if (getData().users.length === 0 && getData().channels.length === 0) {
    return nodata;
  }
}

function channelExists(channelId: number): boolean {
  let found = 0;
  for (const channel of getData().channels) {
    if (channel.channelId === channelId) {
      found = 1;
      return true;
    }
  }
  if (found === 0) {
    return false;
  }
}

function userExists(UserId: number | string): boolean {

  let found = 0;
  for (const user of getData().users) {
    if (user.uId === UserId || user.token === UserId) {
      found = 1;
      return true
    }
  }
  if (found === 0) {
    return false;
  }
}

function findUser(UserId: number | string): user | {error: 'error'} {
  let found = 0;
  if (typeof(UserId) === 'number') {
    for (const user of getData().users) {
      if (user.uId === UserId) {
        found = 1;
        return user;
      }
    }
  } else {
    // Case for checking user is valid from a token entry
    for (const user of getData().users) {
      if (user.token === UserId) {
        found = 1;
        return user;
      }
    }
  }

  if (found === 0) {
    return {error: 'error'};
  }
}

function findChannel(channelId: number): channel | {error: 'error'} {
  if (channelExists(channelId)) {
    for (const channel of getData().channels) {
      if (channel.channelId === channelId) {
        return channel
      }
    }
  } else {
    return {error: 'error'};
  }
}

let messageIds: number[] = [];

function generateMessageId(): number {
  let i = 1;
  let newId = 0
  while (i === 1) {
    i = 0;
    newId = Math.random();
    for (const id of messageIds) {
      if (newId === id) {
        i = 1;
      }
    }
  } 
  messageIds.push(newId);
  return newId;
}

export {clearV1, channelExists, userExists, findUser, findChannel, generateMessageId};
