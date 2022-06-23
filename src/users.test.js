import { userProfileV1 } from './users.js';
import { authRegisterV1 } from './auth.js';

const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo');
const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr')

test('Test 1: successful userProfileV1', () => {
  let user_a = {
    uId: '-1000',
    email: 'cristiano.ronaldo@unsw.edu.au',
    nameFirst: 'Cristiano',
    nameLast: 'Ronaldo',
    username: 'cristianoronaldo',
  }
  expect(userProfileV1(-1000, -1000)).toBe(user_a);
});

test('Test 2: successful userProfileV1', () => {
  let user_b = {
    uId: '-1005',
    email: 'another_cristiano@unsw.edu.au',
    nameFirst: 'Cristiano',
    nameLast: 'Ronaldo',
    username: 'cristianoronaldo',
  }
  expect(userProfileV1(-1005, -1005)).toBe(user_b);
});

test('Test 3: successful userProfileV1', () => {
  let user_c = {
    uId: '-1010',
    email: 'mohammed.mayweatherjr@unsw.edu.au',
    nameFirst: 'Mohammed',
    nameLast: 'Ronaldo',
    username: 'MayweatherJr',
    }
    expect(userProfileV1(-1010, -1010)).toBe(user_c);
});

test('Test 4: invalid userProfileV1', () => {
  expect(userProfileV1(-1015, -1015)).toBe({error: 'error'});
});
