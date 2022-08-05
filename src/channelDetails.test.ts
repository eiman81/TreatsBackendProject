import { clearV1, authRegisterV1, channelDetailsV1, channelsCreateV1 } from './httpWrappers';
import { channelId } from './channels';
import { authUserId } from './auth';

test('ChannelDetail error both invalid codes', () => {
  clearV1();

  const token = '3';
  const channelid = -1;
  expect(channelDetailsV1(token, channelid)).toStrictEqual({ error: 'error' });
});

test('ChannelDetail error, userid not part of desired channel requested', () => {
  clearV1();
  const token = authRegisterV1('sean@gmail.com', '2737svww', 'Sean', 'OConnor') as authUserId;
  const token2 = authRegisterV1('bob@gmail.com', '287swvw3', 'bob', 'green') as authUserId;
  const channelid = channelsCreateV1(token2.token, 'first', false) as channelId;

  expect(channelDetailsV1(token.token, channelid.channelId)).toStrictEqual({ error: 'error' });
});

test('ChannelDetailsV1 working', () => {
  clearV1();

  const token = authRegisterV1('sean@gmail.com', '27hgfu37', 'Sean', 'OConnor') as authUserId;
  const channelid = channelsCreateV1(token.token, 'first', false) as channelId;

  const channeldetails = {
    name: 'first',
    isPublic: false,
    ownerMembers: [token.authUserId],
    allMembers: [token.authUserId]
  };
  expect(channelDetailsV1(token.token, channelid.channelId)).toStrictEqual(channeldetails);
});
