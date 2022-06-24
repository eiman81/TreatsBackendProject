//tests for channelJOin
/*
invalid user invalid channel X

valid user invalid channel X

invalid user valid channel X

valid user valid channel X



user already in channel X

user not in channel X


user without PermissionStatus, private channel

user without PermissionStatusm public channel

user with PermissionStatus, private channel

*/

import { getData, setData } from "./dataStore.js";
import { channelInviteV1, channelJoinV1, channelsCreateV1 } from './channel';
import { authRegisterV1 } from './auth';
import { clearV1 } from './other';
/*
// Setup
// create first valid user
function initialize(){
    let count = 1
    const validuser1  = {
        uId: 1,
        nameFirst: 'Christiano',
        nameLast: 'Ronaldo',
        email: 'cristiano.ronaldo@unsw.edu.au',
        password: '123456',
        username: 'christianosui',
        userRole: null,
        isOnline: null,
      }
    
      count += 1;
    //create second valid user
    const validuser2   = {
        uId: count,
        nameFirst: 'Mohammed',
        nameLast: 'MayweatherJr',
        email: 'mohammed.mayweatherjr@unsw.edu.au',
        password: 'notfloyd',
        username: 'realmayweather',
        userRole: null,
        isOnline: null,
      }
    count += 1;
    
    //create second valid user
    const validchannel = {
        channelId: count,
        channelName: 'Discussion',
        latestMsg: 'Hi Everyone!',
        isPublic: 'true',
        password: null,//'comp1531' //empty if 'isPublic' is true
        ownerMembers: [validuser1],
        allMembers: [validuser1],
    }
    count += 1;
    
    //create invalid users
    const invaliduser = {
        uId: 6789,
        nameFirst: 'Post',
        nameLast: 'Malone',
        email: 'post.malone@unsw.edu.au',
        password: 'stoney',
        username: 'leondechino',
        userRole: null,
        isOnline: null,
      }
    
      const invalidchannel = {
        channelId: 7890,
        channelName: 'Argument',
        latestMsg: 'Shut Up!!',
        isPublic: 'true',
        password: null,//'comp1531' //empty if 'isPublic' is true
        ownerMembers: [],
        allMembers: [],
    }
    
    const privatechannel = {
        channelId: count,
        channelName: 'floyds priv channel',
        latestMsg: 'sup',
        isPublic: 'false',
        password: 'floyd',//'comp1531' //empty if 'isPublic' is true
        ownerMembers: [validuser2],
        allMembers: [validuser2],
    }
    
    let data = {
        users: [validuser1, validuser2],
        channels: [validchannel, privatechannel],
    }
    setData(data);
}
*/
/*
let store = getData()
let users = store.users
let channels = store.channels
*/

const validuser1 = authRegisterV1('another_cristiano@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
const validuser2 = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr');

const validchannel = {
    channelId: 3,
    channelName: 'Discussion',
    latestMsg: 'Hi Everyone!',
    isPublic: 'true',
    password: null,//'comp1531' //empty if 'isPublic' is true
    ownerMembers: [validuser1],
    allMembers: [validuser1],
}


//create invalid users
const invaliduser = {
    uId: 6789,
    nameFirst: 'Post',
    nameLast: 'Malone',
    email: 'post.malone@unsw.edu.au',
    password: 'stoney',
    username: 'leondechino',
    userRole: null,
    isOnline: null,
  }

  const invalidchannel = {
    channelId: 7890,
    channelName: 'Argument',
    latestMsg: 'Shut Up!!',
    isPublic: 'true',
    password: null,//'comp1531' //empty if 'isPublic' is true
    ownerMembers: [],
    allMembers: [],
}

const privatechannel = {
    channelId: 4,
    channelName: 'floyds priv channel',
    latestMsg: 'sup',
    isPublic: 'false',
    password: 'floyd',//'comp1531' //empty if 'isPublic' is true
    ownerMembers: [validuser2],
    allMembers: [validuser2],
}


let data = {
    users: [validuser1, validuser2],
    channels: [validchannel, privatechannel],
}
setData(data);

const cases = [[validuser2, validchannel.channelId, {}], 
               [invaliduser.uId, validchannel.channelId, {error: 'error'}], 
               [validuser2, invalidchannel.channelId, {error: 'error'}], 
               [invaliduser.uId, invalidchannel.channelId,{error: 'error'}]];

describe("'channelJoinV1' utility", () => {
  test.each(cases)(
    "given user %p and channel %p as arguments, returns %p",
    (firstArg, secondArg, expectedResult) => {
      const result = channelJoinV1(firstArg, secondArg);
      expect(result).toStrictEqual(expectedResult);
    }
  );
});



test('channelJoinV1: authorised user already a member of channel', () => {
    clearV1();
    
    let result = channelJoinV1(validuser1.uId, validchannel.channelId)
    
    expect(result).toStrictEqual({error: 'error'});
  });

  test('channelJoinV1: nonpermitted attempts to join private', () => {
    clearV1();
    
    let result = channelJoinV1(validuser1.uId, privatechannel.channelId)
    
    expect(result).toStrictEqual({error: 'error'});
  });

// Channel invite works by verifying authuserid of the invite sender
// before calling the channelJoin command as both functions carry out the 
// same behaviour.
// As such under the assumption that my tests for channelJoinV1 are
// thorough, we only have to test for channelInviteV1 abillity to discern
// a valid authUserID and that the inviter is already in the channel.

test('channelInviteV1: invalid authuserId, valid uId, valid channel', () => {
    clearV1();
    
    let result = channelInviteV1(invaliduser.uId, validuser2, validchannel.channelId)
    
    expect(result).toStrictEqual({error: 'error'});
  });

  test('channelInviteV1: valid authuserId (in channel), valid uId, valid channel', () => {
    clearV1();
    
    let result = channelInviteV1(validuser1.uId, validuser2, validchannel.channelId)
    
    expect(result).toStrictEqual({});
  });

  test('channelInviteV1: valid authuserId (not in channel), valid uId, valid channel', () => {
    clearV1();
    
    let result = channelInviteV1(validuser2.uId, validuser1, validchannel.channelId)
    
    expect(result).toStrictEqual({error: 'error'});
  });
