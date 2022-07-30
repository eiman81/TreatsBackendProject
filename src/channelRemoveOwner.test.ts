
import { clearV1, authRegisterV1, channelsCreateV1, channelJoinV1, channelRemoveOwnerV1 } from "./httpWrappers";
import { authUserId } from './auth';
import { channelId } from './channels';
import { channelAddOwnerV1 } from "./channel";

test('channelRemoveOwnerV1: success', () => {
    clearV1();
    const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const b = channelsCreateV1(a.token, 'channelB', true) as channelId;
    const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
    channelJoinV1(c.token, b.channelId);
    channelAddOwnerV1(a.token, b.channelId, c.authUserId);
    expect(channelRemoveOwnerV1(a.token, b.channelId, c.authUserId).toStrictEqual({}));
  });

test('channelRemoveOwnerV1: invalid channel', () => {
    clearV1();
    const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const b = channelsCreateV1(a.token, 'channelB', true) as channelId;
    const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;

    expect(channelRemoveOwnerV1(a.token, 3009, c.authUserId).toStrictEqual({error: 'error'}));
  });

test('channelRemoveOwnerV1: invalid user', () => {
    clearV1();
    const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const b = channelsCreateV1(a.token, 'channelB', true) as channelId;
    expect(channelRemoveOwnerV1(a.token, b.channelId, 8979).toStrictEqual({error: 'error'}));
  });

test('channelRemoveOwnerV1: user is only owner', () => {
    clearV1();
    const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const b = channelsCreateV1(a.token, 'channelB', true) as channelId;
    const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
    channelJoinV1(c.token, b.channelId);
    expect(channelRemoveOwnerV1(a.token, b.channelId, a.authUserId).toStrictEqual({error: 'error'}));
  });

 test('channelRemoveOwnerV1: non owner tries to remove owner not owner', () => {
    clearV1();
    const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const b = channelsCreateV1(a.token, 'channelB', true) as channelId;
    const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
    channelJoinV1(c.token, b.channelId);
    expect(channelRemoveOwnerV1(c.token, b.channelId, a.authUserId).toStrictEqual({error: 'error'}));
  });
