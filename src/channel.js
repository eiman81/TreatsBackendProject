import { getData, setData } from "./dataStore.js";
import { userProfileV1 } from "./users";

function channelDetailsV1(authUserId, channelId) {
  let valid = 0;
  for (const user of (getData()).users) {
    if (user.uId === authUserId) {
      valid = 1;
    }
  }

  if (valid === 0) {
    return {error: 'error'};
  
  } else {
    for (const channel of (getData().channels)) {
      if (channel.channelId === channelId) {  
        let members = channel.allMembers;
        if (members.includes(authUserId)) {
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
  //check if user id is valid
  //check if channel id is valid
  let store = getData()
  
  if (authUserId in store.users && channelId in store.channels){
    //check if user is already in channel
    if (authUserId in channelDetailsV1(authUserId, channelId).allMembers){
      return {error: 'error'}
    } else if (channelDetailsV1(authUserId, channelId).isPublic === false && userProfileV1(null,authUserId).permissions === false){
      return {error: 'error'}
    } else{
      //add user to channel
      users = store.channels.allMembers
      users.push(userProfileV1(null,authUserId))
      return {}
    }
  } else {
    return {error: 'error'}
  } 
}


function channelInviteV1(authUserId, channelId, uId) {
  if (authUserId in getData().users && authUserId in channelDetailsV1(authUserId, channelId).allMembers){
    channelJoinV1(uId,channelId);
  } else {
    return {error:'error'};
  }
}

function channelMessagesV1(authUserId, channelId, start) {
  return {
    messages: [],
    start: 0,
    end: -1,
  };
}

export { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1 };
