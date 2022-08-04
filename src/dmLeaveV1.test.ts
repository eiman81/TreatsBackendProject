
import { clearV1, authRegisterV1, dmCreateV1, dmLeaveV1 } from "./httpWrappers";
import { authUserId } from './auth';
import { dmId } from './directMessages';

test('dmLeaveV1: success', () => {
    clearV1();
    const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const b = authRegisterV1('another_cristian@unsw.edu.au', 'cristiano7', 'Cristian', 'Ronaldo') as authUserId;;
    const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;;
    const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;
    const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, d.authUserId]) as dmId;

    
    expect(dmLeaveV1(b.token, group.dmId)).toStrictEqual({});
  });


test('dmLeaveV1: invalid dmID', () => {
    clearV1();
    const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const b = authRegisterV1('another_cristian@unsw.edu.au', 'cristiano7', 'Cristian', 'Ronaldo') as authUserId;;
    const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;;
    const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;
    const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, d.authUserId]) as dmId;

    
    expect(dmLeaveV1(b.token, 7932)).toStrictEqual({});
  });

  test('dmLeaveV1: user not in dm', () => {
    clearV1();
    const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const b = authRegisterV1('another_cristian@unsw.edu.au', 'cristiano7', 'Cristian', 'Ronaldo') as authUserId;;
    const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;;
    const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;
    const group = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId, d.authUserId]) as dmId;
    const e = authRegisterV1('eeeeeee@unsw.edu.au', '87654321', 'ffffff', 'EeEeE') as authUserId;
 
    
    expect(dmLeaveV1(e.token, group.dmId)).toStrictEqual({});
  });