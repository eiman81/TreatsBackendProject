import { authRegisterV1, authUserId } from './auth';
import { channelsCreateV1 } from './channels';
import { clearV1 } from './other';
import { channel, user, data } from './dataStore';

test('Clear test', () => {
  const user = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const userId = user.token;
  const channel = channelsCreateV1(userId, '', true);
  const nodata = {};
  expect(clearV1()).toStrictEqual(nodata);
});
