import { channelId, channels } from './channels';
import { clearV1, authRegisterV1, channelsCreateV1, channelsListallV1 } from "./httpWrappers";
import { authUserId } from './auth';

test('ChannelsListallV1 userId not found', () => {
  clearV1();
  const token = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor') as authUserId;
  const token1 = 'hohoho';
  channelsCreateV1(token.token, 'first', true);
<<<<<<< HEAD:src/channelsListAll.test.ts
  expect(channelsListallV1(token1)).toStrictEqual([]);
=======
  expect(channelsListallV1(token1) as {channels: channels[]}).toStrictEqual({ channels: [] });
>>>>>>> 0c0879ba9d6e229fe150e378f28504275a4982ae:src/channelsListAllV1.test.ts
});

test('ChannelsListallV1 working', () => {
  clearV1();
  const token = authRegisterV1('sean@gmail.com', '27334ff7', 'Sean', 'OConnor') as authUserId;
  const channel = channelsCreateV1(token.token, 'first', true) as channelId;
  const channels: channels[] = [
    {
      channelId: channel.channelId,
      name: 'first',
    }
  ];
<<<<<<< HEAD:src/channelsListAll.test.ts
  const result = channelsListallV1(token.token);
  expect(result).toStrictEqual(list);
=======
  const result = channelsListallV1(token.token) as {channels: channels[]};
  expect(result).toStrictEqual({ channels });
>>>>>>> 0c0879ba9d6e229fe150e378f28504275a4982ae:src/channelsListAllV1.test.ts
});
