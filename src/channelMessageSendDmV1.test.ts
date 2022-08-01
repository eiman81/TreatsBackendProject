import { clearV1, authRegisterV1, channelsCreateV1, dmMessagesV1, messageSendV1 } from './httpWrappers';
import { returnMessages, messageId } from './channel';
import { channelId } from './channels';
import { authUserId } from './auth';

test('messageSendDmV1 Working', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristian@unsw.edu.au', 'cristiano7', 'Cristian', 'Ronaldo') as authUserId;;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;
  
  const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, d.authUserId]) as dmId;

  const messageid = messageSendDmV1(user.token, group.dmId, 'is this working?') as messageId;
  const messages = dmMessagesV1(a.token, group.dmId, 0) as returnMessages;
  const id = messages.messages[0].dmId;
  expect(id).toStrictEqual(messageid.messageId);
});

test('messageSendDmV1 error when invalid channelid', () => {
  clearV1();
  const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
  channelsCreateV1(user.token, 'newchannel', false);
  const messageid = messageSendV1(user.token, 0, 'is this working?');
  expect(messageid).toStrictEqual({ error: 'error' });
});

test('messageSendDmV1 error when invalid message length', () => {
  clearV1();
  const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
  const channel = channelsCreateV1(user.token, 'newchannel', false) as channelId;
  const messageid = messageSendV1(user.token, channel.channelId, '');
  expect(messageid).toStrictEqual({ error: 'error' });
});

test('messageSendDmV1 error when user is not a member', () => {
  clearV1();
  const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
  const user2 = authRegisterV1('bob.grate@gmail.com', '5tsgs', 'bob', 'grate') as authUserId;
  const channel = channelsCreateV1(user2.token, 'newchannel', false) as channelId;
  const messageid = messageSendV1(user.token, channel.channelId, 'message');
  expect(messageid).toStrictEqual({ error: 'error' });
});
