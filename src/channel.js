import { getData } from "./dataStore";

function channelDetailsV1(authUserId, channelId) {
  let valid = 0;
  for (const user of getData.users) {
    if (user.uId === authUserId) {
      valid = 1;
    }
  }

  if (valid === 0) {
    return {error: 'error'};
  
  } else {
    for (const channel of getData.channels) {
      if (channel.channelId === channelId) {
        if (channel.allMembers.includes(authUserId)) {
          let channeldetails = {
            name: channel.channelName,
            isPublic: channel.isPublic,
            ownerMembers: channel.ownerMembers,
            allMembers: channel.allMembers
          }
          return channeldetails;
          
        } else {
          return {error: 'error'};
        }
      }
    } 
  }
}

function channelJoinV1(authUserId, channelId) {
  return {};
}

function channelInviteV1(authUserId, channelId, uId) {
  return {};
}

function channelMessagesV1(authUserId, channelId, start) {
  return {
    messages: [],
    start: 0,
    end: -1,
  };
}

export { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1 };
