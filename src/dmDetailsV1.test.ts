import { clearV1, authRegisterV1, dmCreateV1, dmDetailsV1 } from './httpWrappers';
import { authUserId } from './auth';
import { dmId } from './directMessages';

test('dmDetailsV1: success', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristian@unsw.edu.au', 'cristiano7', 'Cristian', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;
  const group = dmCreateV1(a.token, [b.authUserId, c.authUserId, d.authUserId]) as dmId;
  expect(dmDetailsV1(a.token, group.dmId)).toStrictEqual({
    name: 'cristianoronaldo, cristianronaldo, mohammedmayweatherjr, zero0',
    members: [-1005, -1010, -1015, -1000]
  });
});

test('dmDetailsV1: error for invalid dmID', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristian@unsw.edu.au', 'cristiano7', 'Cristian', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;

  const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, d.authUserId]) as dmId;
  expect(dmDetailsV1(a.token, 2048)).toStrictEqual({ error: 'error' });
});

test('dmDetailsV1: error for authuser not in group', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristian@unsw.edu.au', 'cristiano7', 'Cristian', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;
  const e = authRegisterV1('eeeeeee@unsw.edu.au', '87654321', 'ffffff', 'EeEeE') as authUserId;
  const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, d.authUserId]) as dmId;
  expect(dmDetailsV1(e.token, group.dmId)).toStrictEqual({ error: 'error' });
});
