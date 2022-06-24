import { getData } from "./dataStore";

function channelDetailsV1(authUserId, channelId) {
  return {
    name: 'secret candy crush team', 
    isPublic: true,
    ownerMembers: [],
    allMembers: [],
  };
}

function channelJoinV1(authUserId, channelId) {
  return {};
}

function channelInviteV1(authUserId, channelId, uId) {
  return {};
}

function channelMessagesV1(authUserId, channelId, start) {
  const data = getData();
  if (authUserId in data.users && channelId in data.channels){
    if (!(authUserId in channelDetailsV1(authUserId, channelId).allMembers)){
      return {error: 'error'}
    }else if (start > data.channels.messages.length) {
      return {error: 'error'}
    }

  const currmessage = start + 50 > data.channels.messages.length ? data.channels.messages.length : start + 50;
  const end = start + 50 > data.channels.messages.length ? -1 : start + 50;
  const reuslt = data.channels.messages.slice(start, currmessage);
  return {messages: reuslt, start: start, end};
  }
}

export { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1 };
