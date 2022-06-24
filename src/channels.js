import { getData, setData } from "./dataStore.js";

function channelsCreateV1(authUserId, name, isPublic) {
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
/*
< Given a authUserId, Provide an array of all channels (and their associated details) that the authorised user is part of >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>

Exceptions:
Error   -Occurs when

Return Value:
    Returns <channels> on <all test pass>
*/  
  return {
    channels: []
  };
}

function channelsListallV1(authUserId) {
/*
< Given a authUserId, Provide an array of all channels, including private channels, (and their associated details) >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>

Exceptions:
Error   -Occurs when

Return Value:
    Returns <channels> on <all test pass>
*/     
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
