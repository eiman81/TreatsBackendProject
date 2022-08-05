
import { clearV1, authRegisterV1, channelsCreateV1, channelJoinV1, channelAddOwnerV1 } from './httpWrappers';
import { authUserId } from './auth';
import { channelId } from './channels';

test('channelAddOwnerV1: success', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = channelsCreateV1(a.token, 'channelB', true) as channelId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  channelJoinV1(c.token, b.channelId);
  expect(channelAddOwnerV1(a.token, b.channelId, c.authUserId)).toEqual({});
});

test('channelAddOwnerV1: user not in channel', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = channelsCreateV1(a.token, 'channelB', true) as channelId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;

  expect(channelAddOwnerV1(a.token, b.channelId, c.authUserId)).toEqual({ error: 'error' });
});

test('channelAddOwnerV1: invalid channel', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = channelsCreateV1(a.token, 'channelB', true) as channelId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;

  expect(channelAddOwnerV1(a.token, 3009, c.authUserId)).toEqual({ error: 'error' });
});

test('channelAddOwnerV1: invalid uID', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = channelsCreateV1(a.token, 'channelB', true) as channelId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;

  expect(channelAddOwnerV1(a.token, b.channelId, 8979)).toEqual({ error: 'error' });
});

test('channelAddOwnerV1: user already owner', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = channelsCreateV1(a.token, 'channelB', true) as channelId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  channelJoinV1(c.token, b.channelId);
  expect(channelAddOwnerV1(a.token, b.channelId, a.authUserId)).toEqual({ error: 'error' });
});

test('channelAddOwnerV1: authuser not owner', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = channelsCreateV1(a.token, 'channelB', true) as channelId;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
  const d = authRegisterV1('drew.barrymore@unsw.edu.au', 'ctrl', 'Drew', 'Barrymore') as authUserId;
  channelJoinV1(c.token, b.channelId);
  expect(channelAddOwnerV1(c.token, b.channelId, d.authUserId)).toEqual({ error: 'error' });
});
