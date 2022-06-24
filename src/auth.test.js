import { authRegisterV1, authLoginV1 } from './auth';
import { userProfileV1 } from './users'
import { clearV1 } from './other';

test('authRegisterV1: correct output for 1st user', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  expect(a).toStrictEqual(-1000);
});

test('authRegisterV1: correct output for 4th user', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo');
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr');
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0');
  expect(d).toStrictEqual(-1015);
});

test('authRegisterV1: error for email address not valid', () => {
  clearV1();
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
  const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr');
  const b = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  expect(userProfileV1(a, b).username).toStrictEqual('cristianoronaldo');
});

test('authRegisterV1: correct handle for "Guy Thathasareallylongname"', () => { 
  clearV1();  
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = authRegisterV1('guy@unsw.edu.au', 'guywithlong', 'Guy', 'Thathasareallylongname');
  expect(userProfileV1(a, b).username).toStrictEqual('guythathasareallylon');
});

test('authRegisterV1: correct handle for "ZERO 0"', () => {
  clearV1();  
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0');
  expect(userProfileV1(a, b).username).toStrictEqual('zero0');
});

test('authRegisterV1: correct handle for "$mOney 0"', () => {
  clearV1(); 
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = authRegisterV1('money0@unsw.edu.au', 'money123', '$mOney', '$0');
  expect(userProfileV1(a, b).username).toStrictEqual('money0');
});

test('authLoginV1: correct input', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = authLoginV1('cristiano.ronaldo@unsw.edu.au', '123456');
  expect(b).toStrictEqual(a);
});

test('authLoginV1: error for wrong email', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = authLoginV1('cristianoronaldo0@unsw.edu.au', '123456');
  expect(b).toStrictEqual({ error: 'error' });
});

test('authLoginV1: error for wrong password', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = authLoginV1('cristiano.ronaldo@unsw.edu.au', '123456789');
  expect(b).toStrictEqual({ error: 'error' });
});

