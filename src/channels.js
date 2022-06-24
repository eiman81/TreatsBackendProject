import {getData, setData} from './dataStore';

function channelsCreateV1(authUserId, name, isPublic) {
  return {
    channelId: 1,
  };
}

function channelsListV1(authUserId) {
  return {
    channels: []
  };
}

function channelsListallV1(authUserId) {
  let valid = 0;
  for (const user of (getData()).users) {
    if (user.uId === authUserId) {
      valid = 1;
      let channels = getData().channels
      return channels;
    }
  }

  if (valid === 0) {
    let emptyArray = [];
    return emptyArray;
  }
}

export { channelsCreateV1, channelsListV1, channelsListallV1 };
