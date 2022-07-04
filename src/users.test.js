import { userProfileV1 } from './users.js';
import { authRegisterV1 } from './auth.js';
import { clearV1 } from './other.js';

test('Test 1: successful userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr').authUserId;
  const user_a = {
    uId: -1000,
    nameFirst: 'Mohammed',
    nameLast: 'MayweatherJr',
    email: 'mohammed.mayweatherjr@unsw.edu.au',
    password: 'notfloyd',
    username: 'mohammedmayweatherjr',
    userRole: null,
    isOnline: null,
  }
  expect(userProfileV1(a, a)).toStrictEqual(user_a);
});

test('Test 2: successful userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
  const b = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr').authUserId;
  const user_b = {
    uId: -1005,
    nameFirst: 'Mohammed',
    nameLast: 'MayweatherJr',
    email: 'mohammed.mayweatherjr@unsw.edu.au',
    password: 'notfloyd',
    username: 'mohammedmayweatherjr',
    userRole: null,
    isOnline: null,
  }
  expect(userProfileV1(a, b)).toStrictEqual(user_b);
});

test('Test 3: successful userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo').authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr').authUserId;
  let user_c = {
    uId: -1010,
    nameFirst: 'Mohammed',
    nameLast: 'MayweatherJr',
    email: 'mohammed.mayweatherjr@unsw.edu.au',
    password: 'notfloyd',
    username: 'mohammedmayweatherjr',
    userRole: null,
    isOnline: null,
  }
  expect(userProfileV1(b, c)).toStrictEqual(user_c);
});

test('Test 4: successful userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo').authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr').authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0').authUserId;
  let user_d = {
    uId: -1015,
    nameFirst: 'ZERO',
    nameLast: '0',
    email: 'zero0@unsw.edu.au',
    password: '12345678',
    username: 'zero0',
    userRole: null,
    isOnline: null,
    }
    expect(userProfileV1(a, d)).toStrictEqual(user_d);
});

test('Test 5: invalid userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
  const b = null;
  expect(userProfileV1(a, b)).toStrictEqual({error: 'error'});
});
