import { clearV1, authRegisterV1, authLoginV1, userProfileSetEmailV1 } from "./httpWrappers";
import { authUserId } from './auth';

test('Test 1: successful userProfileSetEmailV1', () => {
    clearV1();
    const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
    const newEmail = 'new.email@unsw.edu.au'
    expect(userProfileSetEmailV1(a.token, newEmail)).toStrictEqual({});
  });

test('Test 2: invalid chars in handlestr ', () => {
    clearV1();
    const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
    const newEmail =  'mo$%^&*@gmail.com'
    expect(userProfileSetEmailV1(a.token, newEmail)).toStrictEqual({ error: 'error' });
  });

test('Test 3: already used handlestr ', () => {
    clearV1();
    const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
    const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo') as authUserId;
    const newEmail =  'another_cristiano@unsw.edu.au'
    expect(userProfileSetEmailV1(a.token, newEmail)).toStrictEqual({ error: 'error' });
  });