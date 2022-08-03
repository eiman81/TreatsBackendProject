import { clearV1, authRegisterV1, channelsCreateV1, channelMessagesV1 } from './httpWrappers';
import { returnMessages } from './channel';
import { channelId } from './channels';
import { authUserId } from './auth';

test('Channel Messages error when it recieves an invalid channel id', () => {
  clearV1();

  const user = authRegisterV1('sean@gmail.com', '27hgfu37', 'Sean', 'OConnor') as authUserId;
  // const channelid = channelsCreateV1(user.token, 'first', false) as channelId;

  expect(channelMessagesV1(user.token, 994, 0)).toStrictEqual({ error: 'error' });
});

test('Channel Messages error when channel id valid but user is not part of channel', () => {
  clearV1();

  const authid = authRegisterV1('sean@gmail.com', '27hgfu37', 'Sean', 'OConnor') as authUserId;
  const channelid = channelsCreateV1(authid.token, 'first', false) as channelId;
  const authid2 = authRegisterV1('bob@gmail.com', '27hgf6qs37', 'Bob', 'Jane') as authUserId;

  expect(channelMessagesV1(authid2.token, channelid.channelId, 0)).toStrictEqual({ error: 'error' });
});

test('Channel Messages error when start greater then length of messages', () => {
  clearV1();

  const authid = authRegisterV1('sean@gmail.com', '27hgfu37', 'Sean', 'OConnor') as authUserId;
  const channelid = channelsCreateV1(authid.token, 'first', false) as channelId;

  expect(channelMessagesV1(authid.token, channelid.channelId, 5)).toStrictEqual({ error: 'error' });
});

test('Channel Messages when end greater then length of messages should return -1 for end', () => {
  clearV1();
  const authid = authRegisterV1('sean@gmail.com', '27hgfu37', 'Sean', 'OConnor') as authUserId;
  const channelid = channelsCreateV1(authid.token, 'first', false) as channelId;

  const mes: returnMessages = {
    messages: [],
    start: 0,
    end: -1
  };

  expect(channelMessagesV1(authid.token, channelid.channelId, 0)).toStrictEqual(mes);
});
