import {getData, setData} from './dataStore';

function channelsCreateV1(authUserId, name, isPublic) {
  return {
    channelId: 1,
  };
}

export function channelsListV1(authUserId) {
  let valid = 0;
  for (const user of DataTransfer.user) {
    if (user.uId === authUserId) {
      valid = 1;
      return getData.channels;
    }
  }

  if (valid === 0) {
    let emptyArray = [];
    return emptyArray;
  }
}

export function channelsListallV1(authUserId) {
  return {
    channels: [] // see interface for contents
  };
}

export { channelsCreateV1, channelsListV1, channelsListallV1 };
