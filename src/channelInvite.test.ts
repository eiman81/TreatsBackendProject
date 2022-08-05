
import { user } from './dataStore';
import { clearV1, authRegisterV1, channelsCreateV1, channelInviteV1 } from './httpWrappers';
import { channelId } from './channels';
import { authUserId } from './auth';

const validuser1 = authRegisterV1('another_cristiano@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
const validuser2 = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
const validchannel = channelsCreateV1(validuser1.token, 'Discussion', true) as channelId;
const privatechannel = channelsCreateV1(validuser2.token, 'Discussion', false) as channelId;

// create invalid users
const invaliduser: user = {
  uId: 6789,
  nameFirst: 'Post',
  nameLast: 'Malone',
  email: 'post.malone@unsw.edu.au',
  password: 'stoney',
  handleStr: 'leondechino',
  isOnline: null,
  token: '23'
};

// Channel invite works by verifying authuserid of the invite sender
// before calling the channelJoin command as both functions carry out the
// same behaviour.
// As such under the assumption that my tests for channelJoinV1 are
// thorough, we only have to test for channelInviteV1 abillity to discern
// a valid authUserID and that the inviter is already in the channel.

test('channelInviteV1: invalid authuserId, valid uId, valid channel', () => {
  clearV1();
  const validuser1 = authRegisterV1('another_cristiano@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const validuser2 = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const validchannel = channelsCreateV1(validuser1.token, 'Discussion', true) as channelId;
  const privatechannel = channelsCreateV1(validuser2.token, 'Discussion', false) as channelId;

  const result = channelInviteV1('23', validchannel.channelId, validuser2.authUserId);

  expect(result).toStrictEqual({ error: 'error' });
});

test('channelInviteV1: valid authuserId (in channel), valid uId, valid channel', () => {
  clearV1();
  const validuser1 = authRegisterV1('another_cristiano@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const validuser2 = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const validchannel = channelsCreateV1(validuser1.token, 'Discussion', true) as channelId;
  const privatechannel = channelsCreateV1(validuser2.token, 'Discussion', false) as channelId;

  const result = channelInviteV1(validuser1.token, validchannel.channelId, validuser2.authUserId);

  expect(result).toStrictEqual({});
});

test('channelInviteV1: valid authuserId (not in channel), valid uId, valid channel', () => {
  clearV1();
  const validuser1 = authRegisterV1('another_cristiano@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const validuser2 = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const validchannel = channelsCreateV1(validuser1.token, 'Discussion', true) as channelId;

  const result = channelInviteV1(validuser2.token, validchannel.channelId, validuser2.authUserId);

  expect(result).toStrictEqual({ error: 'error' });
});
