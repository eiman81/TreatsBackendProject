import { clearV1, authRegisterV1, channelsCreateV1, channelMessagesV1, messageSendV1 } from './httpWrappers';
import { returnMessages, messageId } from './channel';
import { channelId } from './channels';
import { authUserId } from './auth';

test('ChannelMessageSend Working', () => {
  clearV1();
  const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
  const channel = channelsCreateV1(user.token, 'newchannel', false) as channelId;
  const messageid = messageSendV1(user.token, channel.channelId, 'is this working?') as messageId;
  const messages = channelMessagesV1(user.token, channel.channelId, 0) as returnMessages;
  const id = messages.messages[0].messageId;
  expect(id).toStrictEqual(messageid.messageId);
});

test('ChannelMessageSend error when invalid channelid', () => {
  clearV1();
  const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
  channelsCreateV1(user.token, 'newchannel', false);
  const messageid = messageSendV1(user.token, 0, 'is this working?');
  expect(messageid).toStrictEqual({ error: 'error' });
});

test('ChannelMessageSend error when invalid message length', () => {
  clearV1();
  const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
  const channel = channelsCreateV1(user.token, 'newchannel', false) as channelId;
  const messageid = messageSendV1(user.token, channel.channelId, '');
  expect(messageid).toStrictEqual({ error: 'error' });
});

test('ChannelMessageSend error when user is not a member', () => {
  clearV1();
  const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
  const user2 = authRegisterV1('bob.grate@gmail.com', '5tsg77s', 'bob', 'grate') as authUserId;
  const channel = channelsCreateV1(user2.token, 'newchannel', false) as channelId;
  const messageid = messageSendV1(user.token, channel.channelId, 'message');
  expect(messageid).toStrictEqual({ error: 'error' });
});
