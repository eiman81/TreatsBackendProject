import { userProfileV1 } from './users';
import { authRegisterV1 } from './auth';
import { clearV1 } from './other';

test('Test 1: successful userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr').authUserId;
  const userA = {
    uId: -1000,
    nameFirst: 'Mohammed',
    nameLast: 'MayweatherJr',
    email: 'mohammed.mayweatherjr@unsw.edu.au',
    password: 'notfloyd',
    username: 'mohammedmayweatherjr',
    isOnline: null,
  }
  expect(userProfileV1(a, a)).toStrictEqual(userA);
});

test('Test 2: successful userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
  const b = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr').authUserId;
  const userB = {
    uId: -1005,
    nameFirst: 'Mohammed',
    nameLast: 'MayweatherJr',
    email: 'mohammed.mayweatherjr@unsw.edu.au',
    password: 'notfloyd',
    username: 'mohammedmayweatherjr',
    isOnline: null,
  }
  expect(userProfileV1(a, b)).toStrictEqual(userB);
});

test('Test 3: successful userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo').authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr').authUserId;
  let userC = {
    uId: -1010,
    nameFirst: 'Mohammed',
    nameLast: 'MayweatherJr',
    email: 'mohammed.mayweatherjr@unsw.edu.au',
    password: 'notfloyd',
    username: 'mohammedmayweatherjr',
    isOnline: null,
  }
  expect(userProfileV1(b, c)).toStrictEqual(userC);
});

test('Test 4: successful userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo').authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr').authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0').authUserId;
  let userD = {
    uId: -1015,
    nameFirst: 'ZERO',
    nameLast: '0',
    email: 'zero0@unsw.edu.au',
    password: '12345678',
    username: 'zero0',
    isOnline: null,
    }
    expect(userProfileV1(a, d)).toStrictEqual(userD);
});

test('Test 5: invalid userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
  const b = null;
  expect(userProfileV1(a, b)).toStrictEqual({error: 'error'});
});
