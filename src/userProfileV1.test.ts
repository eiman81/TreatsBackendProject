import { userProfileV1 } from './users';
import { authRegisterV1, authUserId } from './auth';
import { clearV1 } from './other';
import { channel, user, data } from './dataStore';
import { NullLiteral } from 'typescript';

test('Test 1: successful userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const userA: user = {
    uId: -1000,
    nameFirst: 'Mohammed',
    nameLast: 'MayweatherJr',
    email: 'mohammed.mayweatherjr@unsw.edu.au',
    password: 'notfloyd',
    username: 'mohammedmayweatherjr',
    isOnline: null,
  }
  expect(userProfileV1(a.authUserId, a.authUserId)).toStrictEqual(userA);
});

test('Test 2: successful userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr')as authUserId;
  const userB: user= {
    uId: -1005,
    nameFirst: 'Mohammed',
    nameLast: 'MayweatherJr',
    email: 'mohammed.mayweatherjr@unsw.edu.au',
    password: 'notfloyd',
    username: 'mohammedmayweatherjr',
    isOnline: null,
  }
  expect(userProfileV1(a.authUserId, b.authUserId)).toStrictEqual(userB);
});

test('Test 3: successful userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  let userC: user = {
    uId: -1010,
    nameFirst: 'Mohammed',
    nameLast: 'MayweatherJr',
    email: 'mohammed.mayweatherjr@unsw.edu.au',
    password: 'notfloyd',
    username: 'mohammedmayweatherjr',
    isOnline: null,
  }
  expect(userProfileV1(b.authUserId, c.authUserId)).toStrictEqual(userC);
});

test('Test 4: successful userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;
  let userD: user = {
    uId: -1015,
    nameFirst: 'ZERO',
    nameLast: '0',
    email: 'zero0@unsw.edu.au',
    password: '12345678',
    username: 'zero0',
    isOnline: null,
    }
    expect(userProfileV1(a.authUserId, d.authUserId)).toStrictEqual(userD);
});

test('Test 5: invalid userProfileV1', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b: number = null;
  expect(userProfileV1(a.authUserId, b)).toStrictEqual({error: 'error'});
});
