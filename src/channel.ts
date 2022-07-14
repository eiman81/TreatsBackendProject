import { getData, setData } from "./dataStore";
import { userProfileV1 } from "./users";
import { channelExists, userExists} from "./other"
import { channel } from "./channels"
import { prototype } from "events";

export interface channeldetails {
  name: string,
  isPublic: boolean,
  ownerMembers: number [],
  allMembers: number []
}

export interface returnMessages {
  start: number,
  end: number,
  messages: string[]
}

function channelDetailsV1(authUserId: number, channelId: number) : channeldetails | {error: 'error'} {
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
            name: channel.name,
            isPublic: channel.isPublic,
            ownerMembers: channel.ownerMembers,
            allMembers: channel.allMembers,
          }
          return channeldetails;
          
        } else {
          return {error: 'error'};
        }
      }
    } 
  }
}



function channelJoinV1(authUserId: number, channelId: number): {error: 'error'} {
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
  let store = getData();
  let profile = userProfileV1(authUserId, authUserId);

  // checks no error is returned
  if ('error' in profile) {
    return {error: 'error'}
  } else {
    if (userExists(authUserId) && channelExists(channelId)) {
      //check if user is already in channel
      let channelDetails = channelDetailsV1(authUserId, channelId);
      if ('allMembers' in channelDetails) {
        if (channelDetails.allMembers.includes(authUserId)) {
          return {error: 'error'}

        } else if (channelDetails.isPublic === false) {
          return {error: 'error'}

        } else {
          //add user to channel
          let counter = 0;
          for (const channel of getData().channels) {
            if (channel.channelId = channelId) {
              channel.allMembers.push(authUserId);
              store.channels[counter] = channel;
              setData(store);
              break;
            }
            counter++;
          }
        }
      } 
    }
  }
}

function channelInviteV1(authUserId: number, channelId: number, uId: number) {
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
  let store = getData();
  let profile = userProfileV1(authUserId, authUserId);

  // checks no error is returned
  if ('error' in profile) {
    return {error: 'error'}
  } else {
    if (userExists(authUserId) && channelExists(channelId)) {
      //check if user is already in channel and if uId is real
      let channelDetails = channelDetailsV1(authUserId, channelId);
      if ('allMembers' in channelDetails) {
        if (userExists(uId) === false || channelDetails.allMembers.includes(uId)) {
          return {error: 'error'}

        } else {
          //add user to channel
          let counter = 0;
          for (const channel of getData().channels) {
            if (channel.channelId = channelId) {
              channel.allMembers.push(uId);
              store.channels[counter] = channel;
              setData(store);
              break;
            }
            counter++;
          }
        }
      }
    } else {
      return {error:'error'};
    }
  }
}

function channelMessagesV1(authUserId: number, channelId: number, start: number) : {error:'error'} | returnMessages {
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

  for (const channel of (getData()).channels) {
    if (channel.channelId === channelId) {
      let members = channel.allMembers;
      if (members.includes(authUserId)) {
        let channelRequested = channel;
        
        if (start > channelRequested.messages.length || channelRequested.messages.length === undefined) {
          return {error: 'error'};
        
        } else if (start + 50 >= channelRequested.messages.length) {
          let messages = [];
          let counter = 0;
          for (const message of channelRequested.messages) {
            if (start > counter) {
              counter++;
            } else {
              messages.push(message);
              counter++;
            }
          }

          let mes = {
            messages: messages,
            start: start,
            end: -1
          }
  
          return mes;
        } else {
    
          let end = start + 50;
          let messages = [];
          let counter = 0;
          for (const message of channelRequested.messages) {
            if (start > counter) {
              counter++;
            } else if (start <= counter && counter <= end) {
              messages.push(message);
              counter++;
            }
          }
    
          let mes = {
            messages: messages,
            start: start,
            end: end
          }
    
          return mes;
        }
      } else {
        return {error: 'error'}
      }
    } else {
      return {error: 'error'};
    }
  }
}

export { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1 };
