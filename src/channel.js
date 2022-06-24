import { getData, setData } from "./dataStore.js";
import { userProfileV1 } from "./users.js";

function channelDetailsV1(authUserId, channelId) {
/*
< Given a channelId and authUserId, if this user is the member of this channel, return 
  basic details about the channel >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>
    <channelId> (<integer>)    - <input channelId>

Exceptions:
Error   -Occurs when
1. channelId does not refer to a valid channel
2. channelId is valid and the authorised user is not a member of the channel

Return Value:
    Returns <name, isPublic, ownerMembers, allMembers> on <all test pass>
*/   

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
/*
< Given a channelId and authUserId, if this user can join, adds them to that channel >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>
    <channelId> (<integer>)    - <input channelId>

Exceptions:
Error   -Occurs when
1. channelId does not refer to a valid channel.
2. the authorised user is already a member of the channel.
3. channelId refers to a channel that is private and the authorised user
   is not already a channel member and is not a global owner.


Return Value:
    Returns <{}> on <all test pass>
*/   

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
/*
< Given the vaild authUserId , vaild channelId and Uid, Once invited, the user is added to the channel immediately. 
  In both public and private channels, all members are able to invite users >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>
    <channelId> (<integer>)    - <input channelId>
    <uId> (<integer>)    - <input Uid>

Exceptions:
Error   -Occurs when
1. channelId does not refer to a valid channel.
2. uId does not refer to a valid user.
3. uId refers to a user who is already a member of the channel.
4. channelId is valid and the authorised user is not a member of the channel.

Return Value:
    Returns <{}> on <all test pass>
*/ 
  if (authUserId in getData().users && authUserId in channelDetailsV1(authUserId, channelId).allMembers){
    channelJoinV1(uId,channelId);
  } else {
    return {error:'error'};
  }
}

function channelMessagesV1(authUserId, channelId, start) {
/*
< Given the vaild authUserId , vaild channelId and the start(whitch message you want start), it return the 
  messages between the start and start + 50, if start + 50 more than the recent message, it return the messages
  betwen satrt and the recent message >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>
    <channelId> (<integer>)    - <input channelId>
    <start> (<integer>)    - <input start>

Exceptions:
Error   -Occurs when
1. channelId does not refer to a valid channel.
2. start is greater than the total number of messages in the channel.
3. channelId is valid and the authorised user is not a member of the channel.

Return Value:
    Returns <messages, start, end> on <all test pass>
*/
  return {
    messages: [],
    start: 0,
    end: -1,
  };
}

export { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1 };
