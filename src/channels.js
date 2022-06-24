import {getData, setData} from './dataStore.js'

function channelsCreateV1(authUserId, name, isPublic) {
  
  let data = getData();

  data.channels = [{
      channelId: 1,
      channelName: 'first',
      isPublic: false,
      password: 'comp1531', //empty if 'isPublic' is true
      ownerMembers: [-1000],
      allMembers: [-1000]
  }];

  setData(data);

  return {
    channelId: 1,
  };
}

function channelsListV1(authUserId) {
  return {
    channels: [] // see interface for contents
  };
}

function channelsListallV1(authUserId) {
  return {
    channels: [] // see interface for contents
  };
}

export { channelsCreateV1, channelsListV1, channelsListallV1 };
