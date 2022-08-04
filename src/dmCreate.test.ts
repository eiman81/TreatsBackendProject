import { dmId } from './directMessages';
import { clearV1, authRegisterV1, dmCreateV1 } from "./httpWrappers";
import { authUserId } from './auth';

test('dmCreateV1: succcess', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo') as authUserId;;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;
  
  const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, d.authUserId]) as dmId;
  expect(group).toStrictEqual({ dmId: 1000 });
});

test('dmCreateV1: error for duplicate uId', () => {
    clearV1();
    const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo') as authUserId;;
    const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;;

    
    const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, c.authUserId]);
    expect(group).toStrictEqual({ error: 'error' });
  });

  test('dmCreateV1: error for invalid uID', () => {
    clearV1();
    const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo') as authUserId;;
    const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;;

    
    const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, 9871]);
    expect(group).toStrictEqual({ error: 'error' });
  });