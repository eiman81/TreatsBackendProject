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
  let store = getData();
  const channeldata = store['channel'][channelId]
  if (channeldata === NaN || start > channeldata['messages'].length || ! authUserId in channeldata['members']) {
    return {error: 'error'}
  }
  
  const currmessage = start + 50 > channeldata['messages'].length ? channeldata['messages'].length : start + 50;
  const end = start + 50 > channeldata['messages'].length ? -1 : start + 50;
  // get the messages between index "start" and "start + 50"
  const reuslt = channeldata.messages.slice(start, currmessage);

  return {messages: reuslt, start: start, end: end};
}

export { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1 };
