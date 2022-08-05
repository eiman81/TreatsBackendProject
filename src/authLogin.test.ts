import { clearV1, authRegisterV1, authLoginV1 } from './httpWrappers';
import { authUserId } from './auth';

test('authLoginV1: correct input', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const aId = a.authUserId;
  const b = authLoginV1('cristiano.ronaldo@unsw.edu.au', '123456') as authUserId;
  const bId = b.authUserId;
  expect(bId).toStrictEqual(aId);
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
