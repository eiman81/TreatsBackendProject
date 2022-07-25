
import { authRegisterV1, authLoginV1, authUserId, authLogoutV1 } from './auth';
import { channelsCreateV1, channelsListV1, channelsListallV1 } from './channels';
import { messageSendV1 } from './channel';
import { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1, channelLeaveV1, channelAddOwnerV1, channelRemoveOwnerV1 } from './channel';
import { userProfileV1 } from './users';
import { clearV1, findUser, userExists } from './other';
import { getData, getTokens, setData, setTokens, user } from './dataStore';

test('AuthLogout Working', () => {
  clearV1();
  const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
  const token = user.token;
  expect(authLogoutV1(token)).toStrictEqual({});
});
