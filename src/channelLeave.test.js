
import { clearV1, authRegisterV1, channelsCreateV1, channelJoinV1, channelLeaveV1 } from "./httpWrappers";
import { authUserId } from './auth';
import { channelId } from './channels';

test('channelLeaveV1: success', () => {
    clearV1();
    const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const b = channelsCreateV1(a.token, 'channelB', true) as channelId;
    const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
    channelJoinV1(c.token, b.channelId);
    expect(channelLeaveV1(c.token, b.channelId).toStrictEqual({}));
  });


test('channelLeaveV1: user not in channel', () => {
    clearV1();
    const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const b = channelsCreateV1(a.token, 'channelB', true) as channelId;
    const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;

    expect(channelLeaveV1(c.token, b.channelId).toStrictEqual({error: 'error'}));
  });

  test('channelLeaveV1: invalid channel', () => {
    clearV1();
    const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const b = channelsCreateV1(a.token, 'channelB', true) as channelId;
    const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;

    expect(channelLeaveV1(c.token, 3009).toStrictEqual({error: 'error'}));
  });