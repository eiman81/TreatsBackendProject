import { NODATA } from 'dns';
import { getData, setData, data, user } from './dataStore';
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
  if (typeof (UserId) === 'number') {
    for (const user of getData().users) {
      if (user.uId === UserId) {
        found = 1;
        return true;
      }
    }
  } else {
    // Case for checking user is valid from a token entry
    for (const user of getData().users) {
      if (user.token === UserId) {
        found = 1;
        return true;
      }
    }
  }

  if (found === 0) {
    return false;
  }
}

function findUser(UserId: number | string): user | boolean {
  let found = 0;
  if (typeof (UserId) === 'number') {
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
    return false;
  }
}

export { clearV1, channelExists, userExists, findUser };
