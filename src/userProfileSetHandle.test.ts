import { clearV1, authRegisterV1, authLoginV1, userProfileSetHandleV1 } from './httpWrappers';
import { authUserId } from './auth';

test('Test 1: successful userProfileSetHandleV1', () => {
  clearV1();
  const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const newHandleStr = 'jeffoo';
  expect(userProfileSetHandleV1(a.token, newHandleStr)).toStrictEqual({});
});

test('Test 2: handlestr too long', () => {
  clearV1();
  const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const newHandleStr = 'mohammedmayweatherjr111';
  expect(userProfileSetHandleV1(a.token, newHandleStr)).toStrictEqual({ error: 'error' });
});

test('Test 3: handlestr too short', () => {
  clearV1();
  const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const newHandleStr = 'mo';
  expect(userProfileSetHandleV1(a.token, newHandleStr)).toStrictEqual({ error: 'error' });
});

test('Test 4: invalid chars in handlestr ', () => {
  clearV1();
  const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const newHandleStr = 'mo!@#$%^&*sjr';
  expect(userProfileSetHandleV1(a.token, newHandleStr)).toStrictEqual({ error: 'error' });
});

test('Test 5: already used handlestr ', () => {
  clearV1();
  const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo') as authUserId;
  const newHandleStr = 'cristianoronaldo';
  expect(userProfileSetHandleV1(a.token, newHandleStr)).toStrictEqual({ error: 'error' });
});
