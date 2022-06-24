import { getData, setData } from "./dataStore.js";

function channelsCreateV1(authUserId, name, isPublic) {
  const data = getData();
  
  if (isPublic !== false && isPublic !== true) {
    return { error: 'error' };
  }
  
  if (name.length < 1 || name.length > 20) {
    return { error: 'error' };
  }
  

  let idMatched = false;
  for (let i = 0; i < data.users.length; i++) {
    if (authUserId === data.users[i].uId) {
      idMatched = true;
      break;
    }
  }
  if (idMatched === false) {
    return { error: 'error' };
  }
  
  let i = 0;
  for (const channels in data.channels) {
    if (name === channels.channelId) {
      i++;
      name = name + i.toString();
    }
  }


  let highest = 995;
  for (let i = 0; i < data.channels.length; i++) {
    if (data.channels[i].channelId >= highest) {
      highest = data.channels[i].channelId;
    }
  }
  let channelId = highest + 5;
  
  data.channels.push({
    'channelId': channelId,
    'channelName': name,
    'latestMsg': null,
    'isPublic': isPublic,
    'ownerMembers' : [authUserId],
    'allMembers': [authUserId],
  });
  
  setData(data);
  return highest + 5;
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
