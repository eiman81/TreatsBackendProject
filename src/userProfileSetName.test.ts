import { clearV1, authRegisterV1, authLoginV1, userProfileSetNameV1 } from "./httpWrappers";
import { authUserId } from './auth';

test('Test 1: successful userProfileSetNameV1', () => {
    clearV1();
    const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
    const newNameFirst = 'Mo'
    const newNameLast = 'May'
    expect(userProfileSetNameV1(a.token, newNameFirst, newNameLast)).toStrictEqual({});
  });

test('Test 2: newNameLast too long ', () => {
    clearV1();
    const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
    const newNameFirst = 'Mohammed'
    const newNameLast = 'Mayweatherqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm'
    expect(userProfileSetNameV1(a.token, newNameFirst, newNameLast)).toStrictEqual({ error: 'error' });
  });

test('Test 3: newNameFirst too long ', () => {
    clearV1();
    const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
    const newNameFirst = 'Mohammedqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm'
    const newNameLast = 'Mayweather'
    expect(userProfileSetNameV1(a.token, newNameFirst, newNameLast)).toStrictEqual({ error: 'error' });
  });
