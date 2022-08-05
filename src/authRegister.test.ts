import { clearV1, authRegisterV1, authLoginV1, userProfileV1 } from './httpWrappers';
import { authUserId } from './auth';
import { user } from './dataStore'
import { isExportDeclaration } from "typescript";

test('authRegisterV1: correct output for 1st user', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const aId = a.authUserId;
  expect(aId).toStrictEqual(-1000);
});

test('authRegisterV1: correct output for 4th user', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo');
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr');
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;
  const dId = d.authUserId;
  expect(dId).toStrictEqual(-1015);
});

test('authRegisterV1: error for email address not valid', () => {
  clearV1();
  // expect(authRegisterV1('not$%@valid@unsw.edu.au', 'notvalid123', 'not', 'valid').toThrow(400)
  expect(() => authRegisterV1('not$%@valid@unsw.edu.au', 'notvalid123', 'not', 'valid')).toThrow('400')
});

test('authRegisterV1: error for email address already in use', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  expect(() => authRegisterV1('cristiano.ronaldo@unsw.edu.au', 'copycat123', 'Copy', 'cat')).toThrow('400')
});

test('authRegisterV1: error for length of password', () => {
  clearV1();
  expect(() => authRegisterV1('john.newton0@unsw.edu.au', '123', 'John', 'Newton')).toThrow('400')
});

test('authRegisterV1: error for length of first name (<1)', () => {
  clearV1();
  expect(() => authRegisterV1('smith@unsw.edu.au', 'smith1234', '', 'Smith')).toThrow('400');
});

test('authRegisterV1: error for length of first name (>50)', () => {
  clearV1();
  expect(() => authRegisterV1('long.smith@unsw.edu.au', 'longsmith1234', 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz', 'Smith')).toThrow('400');
});

test('authRegisterV1: error for length of last name (<1)', () => {
  clearV1();
  expect(() => authRegisterV1('jake@unsw.edu.au', 'jake1234', 'Jake', '')).toThrow('400');
});

test('authRegisterV1: error for length of last name (>50)', () => {
  clearV1();
  expect(() => authRegisterV1('long.jake@unsw.edu.au', 'longjake1234', 'Jake', 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz')).toThrow('400');
});

test('authRegisterV1: correct handle for "Mohammed MayweatherJr"', () => {
  clearV1();
  const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const aId = a.token;
  const b = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const bId = b.authUserId;
  const profile = userProfileV1(aId, bId) as user;
  expect(profile.handleStr).toStrictEqual('cristianoronaldo');
});

test('authRegisterV1: correct handle for same name', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '1234567', 'Cristiano', 'Ronaldo') as authUserId;
  const aId = a.token;
  const b = authRegisterV1('cristiano.ronaldo0@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const c = authRegisterV1('cristiano.ronaldo1@unsw.edu.au', '1234567', 'Cristiano', 'Ronaldo') as authUserId;
  const cId = c.authUserId;
  const profile = userProfileV1(aId, cId) as user;
  expect(profile.handleStr).toStrictEqual('cristianoronaldo1');
});

test('authRegisterV1: correct handle for "Guy Thathasareallylongname"', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const aId = a.token;
  const b = authRegisterV1('guy@unsw.edu.au', 'guywithlong', 'Guy', 'Thathasareallylongname') as authUserId;
  const bId = b.authUserId;
  const profile = userProfileV1(aId, bId) as user;
  expect(profile.handleStr).toStrictEqual('guythathasareallylon')
});

test('authRegisterV1: correct handle for "ZERO 0"', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const aId = a.token;
  const b = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;
  const bId = b.authUserId;
  const profile = userProfileV1(aId, bId) as user;
  expect(profile.handleStr).toStrictEqual('zero0')
});

test('authRegisterV1: correct handle for "$mOney 0"', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const aId = a.token;
  const b = authRegisterV1('money0@unsw.edu.au', 'money123', '$mOney', '$0') as authUserId;
  const bId = b.authUserId;
  const profile = userProfileV1(aId, bId) as user;
  expect(profile.handleStr).toStrictEqual('money0');
});
