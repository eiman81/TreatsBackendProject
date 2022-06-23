//tests for channelJOin


import { channelJoinV1, channelsCreateV1 } from './channel';
import { authRegisterV1, authLoginV1 } from './auth';
import { clearV1 } from './other';

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

const validuser2   = {
    uId: 2,
    nameFirst: 'Mohammed',
    nameLast: 'MayweatherJr',
    email: 'mohammed.mayweatherjr@unsw.edu.au',
    password: 'notfloyd',
    username: 'realmayweather',
    userRole: null,
    isOnline: null,
  }

const validchannel = {
    channelId: 3,
    channelName: 'Discussion',
    latestMsg: 'Hi Everyone!',
    isPublic: 'false',
    password: null,//'comp1531' //empty if 'isPublic' is true
    start: 5,
}


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

test('channelJoinV1: valid user, valid channel', () => {
  clearV1();
  
  let result = channelJoinV1(validuser2.uId, validchannel.channelId)
  
  expect(result).toBe({});
});


test('channelJoinV1: invalid user, valid channel', () => {
    clearV1();
    
    let result = channelJoinV1(invaliduser.uId, validchannel.channelId)
    
    expect(result).toBe({error: 'error'});
  });
  
/*
invalid user invalid channel 

valid user invalid channel

invalid user valid channel X

valid user valid channel X



user already in channel

user not in channel


user without PermissionStatus, private channel

user without PermissionStatusm public channel

user with PermissionStatus, private channel

*/