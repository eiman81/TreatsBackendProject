import { channel, user } from './dataStore';
import { clearV1, authRegisterV1, channelsCreateV1, channelJoinV1 } from './httpWrappers';
import { channelId } from './channels';
import { authUserId } from './auth';

test('channelJoinV1: authorised user already a member of channel', () => {
  clearV1();
  const validuser1 = authRegisterV1('valid.user@gmail.com', '387f3h87', 'valid', 'user') as authUserId;
  const validchannel = channelsCreateV1(validuser1.token, 'discussion', true) as channelId;
  const result = channelJoinV1(validuser1.token, validchannel.channelId);
  expect(result).toStrictEqual({ error: 'error' });
});

test('channelJoinV1: nonpermitted attempts to join private', () => {
  clearV1();
  const validuser1 = authRegisterV1('valid.user@gmail.com', '387f3h87', 'valid', 'user') as authUserId;
  const validuser2 = authRegisterV1('valid2.person@gmail.com', '2378gffe', 'valid22', 'person') as authUserId;
  const validchannel = channelsCreateV1(validuser1.token, 'discussion', false) as channelId;
  const result = channelJoinV1(validuser2.token, validchannel.channelId);
  expect(result).toStrictEqual({ error: 'error' });
});

test('channelJoinV1: success', () => {
  clearV1();
  const validuser1 = authRegisterV1('valid.user@gmail.com', '387f3h87', 'valid', 'user') as authUserId;
  const validuser2 = authRegisterV1('valid2.person@gmail.com', '2378gffe', 'valid22', 'person') as authUserId;
  const validchannel = channelsCreateV1(validuser1.token, 'discussion', true) as channelId;
  const result = channelJoinV1(validuser2.token, validchannel.channelId);
  expect(result).toStrictEqual({});
});
