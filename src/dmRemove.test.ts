import { dmId } from './directMessages';
import { clearV1, authRegisterV1, dmCreateV1, dmRemoveV1 } from './httpWrappers';
import { authUserId } from './auth';

test('dmRemoveV1: succcess', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;

  const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, d.authUserId]) as dmId;
  expect(dmRemoveV1(a.token, group.dmId)).toEqual({});
});

test('dmRemoveV1: error for invalid dmId', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;

  const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, c.authUserId]);
  expect(dmRemoveV1(a.token, 5832)).toEqual({ error: 'error' });
});

test('dmRemoveV1: error for authuserId not creator', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;

  const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, d.authUserId]) as dmId;
  expect(dmRemoveV1(d.token, group.dmId)).toEqual({ error: 'error' });
});

test('dmRemoveV1: error for authuserId not in dm', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;

  const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId]) as dmId;
  expect(dmRemoveV1(d.token, group.dmId)).toEqual({ error: 'error' });
});
