import { authRegisterV1 } from './auth';

test('authRegisterV1: correct output for "Cristiano Ronaldo"', () => {
  clear();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const authUserId = a.authUserId;
  expect(authUserId).toBe('cristianoronaldo');
});

test('authRegisterV1: correct output for same name', () => {
  clear();
  const a = authRegisterV1('another_cristiano@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const authUserId = a.authUserId;
  expect(authUserId).toBe('cristianoronaldo');
});

test('authRegisterV1: correct output for "Mohammed MayweatherJr"', () => {
  clear();
  const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr');
  const authUserId = a.authUserId;
  expect(authUserId).toBe('mohammedmayweatherjr');
});

test('authRegisterV1: correct output for "Guy Thathasareallylongname"', () => {
  clear();
  const a = authRegisterV1('guy@unsw.edu.au', 'guywithlong', 'Guy', 'Thathasareallylongname');
  const authUserId = a.authUserId;
  expect(authUserId).toBe('guythathasareallylon');
});

test('authRegisterV1: correct output for "ZERO 0"', () => {
  clear();
  const a = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0');
  const authUserId = a.authUserId;
  expect(authUserId).toBe('zero0');
});

test('authRegisterV1: correct output for "$mOney 0"', () => {
  clear();
  const a = authRegisterV1('money0@unsw.edu.au', '12345678', '$mOney', '$0');
  const authUserId = a.authUserId;
  expect(authUserId).toBe('money0');
});

test('authRegisterV1: error for email address not valid', () => {
  clear();
  const a = authRegisterV1('not$%valid@unsw.edu.au', 'notvalid123', 'not', 'valid');
  const authUserId = a.authUserId;
  expect(authUserId).toBe({ error: 'error' });
});

test('authRegisterV1: error for email address already in use', () => {
  clear();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', 'copycat123', 'Copy', 'cat');
  const authUserId = a.authUserId;
  expect(authUserId).toBe({ error: 'error' });
});

test('authRegisterV1: error for length of password', () => {
  clear();
  const a = authRegisterV1('john.newton0@unsw.edu.au', '123', 'John', 'Newton');
  const authUserId = a.authUserId;
  expect(authUserId).toBe({ error: 'error' });
});

test('authRegisterV1: error for length of first name (<1)', () => {
  clear();
  const a = authRegisterV1('smith@unsw.edu.au', 'smith1234', '', 'Smith');
  const authUserId = a.authUserId;
  expect(authUserId).toBe({ error: 'error' });
});

test('authRegisterV1: error for length of first name (>50)', () => {
  clear();
  const a = authRegisterV1('long.smith@unsw.edu.au', 'longsmith1234', 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz', 'Smith');
  const authUserId = a.authUserId;
  expect(authUserId).toBe({ error: 'error' });
});


test('authRegisterV1: error for length of last name (<1)', () => {
  clear();
  const a = authRegisterV1('jake@unsw.edu.au', 'jake1234', 'Jake', '');
  const authUserId = a.authUserId;
  expect(authUserId).toBe({ error: 'error' });
});

test('authRegisterV1: error for length of last name (>50)', () => {
  clear();
  const a = authRegisterV1('long.jake@unsw.edu.au', 'longjake1234', 'Jake', 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz');
  const authUserId = a.authUserId;
  expect(authUserId).toBe({ error: 'error' });
});





