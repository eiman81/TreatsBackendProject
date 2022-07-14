//tests for channelJoin
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

import { channel, getData, setData, user } from "./dataStore";
import { channelInviteV1, channelJoinV1, channelDetailsV1, channelMessagesV1} from './channel';
import { channelsCreateV1, channelId } from './channels'
import { authRegisterV1, authUserId } from './auth';
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

const validuser1 = authRegisterV1('another_cristiano@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
const validuser2 = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
const validchannel = channelsCreateV1(validuser1.authUserId, 'Discussion', true) as channelId;
const privatechannel = channelsCreateV1(validuser2.authUserId, 'Discussion', false) as channelId;
/*
const validchannel = {
    channelId: 3,
    channelName: 'Discussion',
    latestMsg: 'Hi Everyone!',
    isPublic: 'true',
    password: null,//'comp1531' //empty if 'isPublic' is true
    ownerMembers: [validuser1],
    allMembers: [validuser1],
}
*/

//create invalid users
const invaliduser: user = {
    uId: 6789,
    nameFirst: 'Post',
    nameLast: 'Malone',
    email: 'post.malone@unsw.edu.au',
    password: 'stoney',
    username: 'leondechino',
    isOnline: null,
  }

  const invalidchannel: channel = {
    channelId: 7890,
    name: 'Argument',
    latestMsg: 'Shut Up!!',
    messages: [],
    numberOfMessages: 3,
    isPublic: true,
    ownerMembers: [],
    allMembers: [],
}
/*
const privatechannel = {
    channelId: 4,
    channelName: 'floyds priv channel',
    latestMsg: 'sup',
    isPublic: 'false',
    password: 'floyd',//'comp1531' //empty if 'isPublic' is true
    ownerMembers: [validuser2],
    allMembers: [validuser2],
}
*/

const cases = [[validuser2.authUserId, validchannel.channelId, {error: 'error'}], 
               [invaliduser.uId, validchannel.channelId, {error: 'error'}], 
               [validuser2.authUserId, invalidchannel.channelId, {error: 'error'}], 
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
    
    let result = channelJoinV1(validuser1.authUserId, validchannel.channelId)
    
    expect(result).toStrictEqual({error: 'error'});
  });

  test('channelJoinV1: nonpermitted attempts to join private', () => {
    clearV1();
    
    let result = channelJoinV1(validuser1.authUserId, privatechannel.channelId)
    
    expect(result).toStrictEqual({error: 'error'});
  });
