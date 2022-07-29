
import { authUserId } from './auth';
import { clearV1, authRegisterV1, authLoginV1, authLogoutV1 } from './httpWrappers';


test('AuthLogout Working', () => {
  clearV1();
  const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
  const token = user.token;
  expect(authLogoutV1(token)).toStrictEqual({});
});
