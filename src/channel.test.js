//tests for channelJOin and invite


import { channelJoinV1 } from './channel';

test('channelJoinV1: valid user, valid channel', () => {
  clear();
  const channelcreator = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const newmember = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr');
  const christianoschannel = channelsCreateV1(channelcreator.authUserId, 'suiii', true)
  channelJoinV1()
  const authUserId = a.authUserId;
  expect(authUserId).toBe('cristianoronaldo');
});


/*
invalid user invalid channel

valid user invalid channel

invalid user valid channel

valid user valid channel



user already in channel

user not in channel


user without PermissionStatus, private channel

user without PermissionStatusm public channel

user with PermissionStatus, private channel

*/