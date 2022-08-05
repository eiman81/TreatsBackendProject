import { clearV1, authRegisterV1, dmCreateV1, dmMessagesV1, messageSendDmV1 } from './httpWrappers';
import { returnMessages, messageId } from './channel';
import { dmId } from './directMessages';
import { authUserId } from './auth';

test('messageSendDmV1 Working', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristian@unsw.edu.au', 'cristiano7', 'Cristian', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;

  const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, d.authUserId]) as dmId;

  const messageid = messageSendDmV1(a.token, group.dmId, 'is this working?') as messageId;
  const messages = dmMessagesV1(a.token, group.dmId, 0) as returnMessages;
  const id = messages.messages[0].messageId;
  expect(id).toStrictEqual(messageid.messageId);
});

test('messageSendDmV1 dmId does not refer to a valid DM', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristian@unsw.edu.au', 'cristiano7', 'Cristian', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;

  const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, d.authUserId]) as dmId;
  const messageid = messageSendDmV1(a.token, 8503, 'is this working?');
  expect(messageid).toStrictEqual({ error: 'error' });
});

test('messageSendDmV1 error when invalid message too short', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristian@unsw.edu.au', 'cristiano7', 'Cristian', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;

  const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, d.authUserId]) as dmId;
  const messageid = messageSendDmV1(a.token, group.dmId, '');
  expect(messageid).toStrictEqual({ error: 'error' });
});

test('messageSendDmV1 error when invalid message too long', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristian@unsw.edu.au', 'cristiano7', 'Cristian', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;

  const longMessage = 'a'.repeat(1001);
  const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, d.authUserId]) as dmId;
  const messageid = messageSendDmV1(a.token, group.dmId, longMessage);
  expect(messageid).toStrictEqual({ error: 'error' });
});

test('messageSendDmV1 error when authuser is not a member', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristian@unsw.edu.au', 'cristiano7', 'Cristian', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;

  const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, d.authUserId]) as dmId;
  const e = authRegisterV1('eeeeeee@unsw.edu.au', '87654321', 'ffffff', 'EeEeE') as authUserId;
  const messageid = messageSendDmV1(e.token, group.dmId, 'message');
  expect(messageid).toStrictEqual({ error: 'error' });
});
