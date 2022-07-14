import { getData, setData } from "./dataStore";

export interface channel {
  channelId: number,
  name: string,
  latestMsg: string,
  numberOfMessages: number, 
  messages: string[],
  isPublic: boolean,
  ownerMembers: number[],
  allMembers: number[]
}

export interface channels {
  channelId: number,
  name: string
}
function channelsCreateV1(authUserId: number, name: string, isPublic: boolean): {error: 'error'} | {channelId: number} {
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
  
  
  let count = 0;
  for (let i = 0; i < data.channels.length; i++) {
    if (name === data.channels[i].name.slice(0, name.length)) {
      count++;
    }
  }
  if (count > 0 ) {
    name = name + (count - 1).toString();
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
    'name': name,
    'latestMsg': null,
    'numberOfMessages': null,
    'messages': [],
    'isPublic': isPublic,
    'ownerMembers' : [authUserId],
    'allMembers': [authUserId]
  });

  setData(data);
  return {
    channelId: channelId,
  } 
}

function channelsListV1(authUserId: number): {error: 'error'} | channels[] {
  
  const data = getData();
  let channels = [];
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

  for (let c = 0; c < data.channels.length; c++) {
    for (let i = 0; i < data.channels[c].allMembers.length; i++) {
      if (data.channels[c].allMembers[i] === authUserId) {
        
        let channel = {
          channelId: data.channels[c].channelId,
          name: data.channels[c].name
        }
        channels.push(channel);
      }
    }
  }
  return channels;
}

function channelsListallV1(authUserId: number): {error: 'error'} | channels[] {
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
  let channels = [];
  for (const user of data.users) {
    if (user.uId === authUserId) {
      valid = 1;
      for (const channel of data.channels) {
        let channeldetails = {
          channelId: channel.channelId,
          name: channel.name
        }
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
