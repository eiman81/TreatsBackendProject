import { getData } from "./dataStore";

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
  return {
    name: 'secret candy crush team', 
    isPublic: true,
    ownerMembers: [],
    allMembers: [],
  };
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
  return {};
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
  return {};
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
  const data = getData();
  if (authUserId in data.users && channelId in data.channels){
    if (!(authUserId in channelDetailsV1(authUserId, channelId).allMembers)){
      return {error: 'error'}
    }else if (start > data.channels.messages.length) {
      return {error: 'error'}
    }
  //compare the start+50 and the amount of messages, if start+50 more than amount of messages, the currmessage should be the 
  //recent message, otherwise, the currmessage should be the start+50
  const currmessage = start + 50 > data.channels.messages.length ? data.channels.messages.length : start + 50;
  //if this function has returned the least recent messages in the channel(messages.length less than start+50), returns -1 in "end" 
  //to indicate there are no more messages to load after this return.
  const end = start + 50 > data.channels.messages.length ? -1 : start + 50;
  //use slice to get the messages between start, start+50, or recent message.
  const reuslt = data.channels.messages.slice(start, currmessage);
  return {messages: reuslt, start: start, end};
  }
}

export { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1 };
