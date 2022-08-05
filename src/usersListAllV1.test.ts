import { channelId, channels } from './channels';
import { clearV1, authRegisterV1, usersListAllV1, userProfileV1 } from './httpWrappers';
import { authUserId } from './auth';

test('UsersListAll working', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristian@unsw.edu.au', 'cristiano7', 'Cristian', 'Ronaldo') as authUserId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;

  const allUsers = [userProfileV1(a.token, a.authUserId), userProfileV1(b.token, b.authUserId), userProfileV1(c.token, c.authUserId), userProfileV1(d.token, d.authUserId)];
  expect(usersListAllV1(a.token)).toStrictEqual({ users: allUsers });
});
