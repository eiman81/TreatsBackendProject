import { getData } from "./dataStore";
import { userProfileV1 } from "./users";
function channelDetailsV1(authUserId, channelId) {
  return {
    name: 'secret candy crush team', 
    isPublic: true,
    ownerMembers: [],
    allMembers: [],
  };
}

function channelJoinV1(authUserId, channelId) {

  //check if user id is valid
  //check if channel id is valid
  if (authuserID in getData().users() && channelId in getData().channels()){
    //check if user is already in channel
    if (authuserID in channelDetailsV1(authUserId, channelId).allMembers){
      return {error: 'error'}
    } else if (channelDetailsV1(authUserId, channelId).isPublic === false && userProfileV1(null,authUserId).permissions === false){
      return {error: 'error'}
    } else{
      //add user to channel
      let store = getData()
      users = store.channels.allMembers
      users.push()

    }
  } else {
    return {error: 'error'}
  } 
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
