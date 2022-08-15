import { clearV1, authRegisterV1, authLoginV1, userProfileV1 } from './httpWrappers';
import { authUserId } from './auth';

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

  // expect(authRegisterV1('not$%@valid@unsw.edu.au', 'notvalid123', 'not', 'valid')).toThrow(400);

  const a = authRegisterV1('not$%@valid@unsw.edu.au', 'notvalid123', 'not', 'valid');
  expect(a).toStrictEqual({ error: 'error' });
});

test('authRegisterV1: error for email address already in use', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = authRegisterV1('cristiano.ronaldo@unsw.edu.au', 'copycat123', 'Copy', 'cat');
  expect(b).toStrictEqual({ error: 'error' });
});

test('authRegisterV1: error for length of password', () => {
  clearV1();
  const a = authRegisterV1('john.newton0@unsw.edu.au', '123', 'John', 'Newton');
  expect(a).toStrictEqual({ error: 'error' });
});

test('authRegisterV1: error for length of first name (<1)', () => {
  clearV1();
  const a = authRegisterV1('smith@unsw.edu.au', 'smith1234', '', 'Smith');
  expect(a).toStrictEqual({ error: 'error' });
});

test('authRegisterV1: error for length of first name (>50)', () => {
  clearV1();
  const a = authRegisterV1('long.smith@unsw.edu.au', 'longsmith1234', 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz', 'Smith');
  expect(a).toStrictEqual({ error: 'error' });
});

test('authRegisterV1: error for length of last name (<1)', () => {
  clearV1();
  const a = authRegisterV1('jake@unsw.edu.au', 'jake1234', 'Jake', '');
  expect(a).toStrictEqual({ error: 'error' });
});

test('authRegisterV1: error for length of last name (>50)', () => {
  clearV1();
  const a = authRegisterV1('long.jake@unsw.edu.au', 'longjake1234', 'Jake', 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz');
  expect(a).toStrictEqual({ error: 'error' });
});

test('authRegisterV1: correct handle for "Mohammed MayweatherJr"', () => {
  clearV1();
  const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const aId = a.token;
  const b = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const bId = b.authUserId;
  const profile = userProfileV1(aId, bId);
  if ('handleStr' in profile) {
    expect(profile.handleStr).toStrictEqual('cristianoronaldo');
  } else {
    expect(profile).toStrictEqual({ error: 'error' });
  }
});

test('authRegisterV1: correct handle for same name', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '1234567', 'Cristiano', 'Ronaldo') as authUserId;
  const aId = a.token;
  const b = authRegisterV1('cristiano.ronaldo0@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const c = authRegisterV1('cristiano.ronaldo1@unsw.edu.au', '1234567', 'Cristiano', 'Ronaldo') as authUserId;
  const cId = c.authUserId;
  const profile = userProfileV1(aId, cId);
  if ('handleStr' in profile) {
    expect(profile.handleStr).toStrictEqual('cristianoronaldo1');
  } else {
    expect(profile).toStrictEqual({ error: 'error' });
  }
});

test('authRegisterV1: correct handle for "Guy Thathasareallylongname"', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const aId = a.token;
  const b = authRegisterV1('guy@unsw.edu.au', 'guywithlong', 'Guy', 'Thathasareallylongname') as authUserId;
  const bId = b.authUserId;
  const profile = userProfileV1(aId, bId);
  if ('handleStr' in profile) {
    expect(profile.handleStr).toStrictEqual('guythathasareallylon');
  } else {
    expect(profile).toStrictEqual({ error: 'error' });
  }
});

test('authRegisterV1: correct handle for "ZERO 0"', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const aId = a.token;
  const b = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;
  const bId = b.authUserId;
  const profile = userProfileV1(aId, bId);
  if ('handleStr' in profile) {
    expect(profile.handleStr).toStrictEqual('zero0');
  } else {
    expect(profile).toStrictEqual({ error: 'error' });
  }
});

test('authRegisterV1: correct handle for "$mOney 0"', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const aId = a.token;
  const b = authRegisterV1('money0@unsw.edu.au', 'money123', '$mOney', '$0') as authUserId;
  const bId = b.authUserId;
  const profile = userProfileV1(aId, bId);
  if ('handleStr' in profile) {
    expect(profile.handleStr).toStrictEqual('money0');
  } else {
    expect(profile).toStrictEqual({ error: 'error' });
  }
});
