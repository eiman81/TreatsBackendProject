import { channelId, channels } from './channels';
import { clearV1, authRegisterV1, channelsCreateV1, channelsListV1 } from "./httpWrappers";
import { authUserId } from './auth';

test('ChannelsListV1: error for userId not found', () => {
  clearV1();
  const token = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const wrongToken = 'wrong';
  const channel = channelsCreateV1(wrongToken, 'new', false) as channelId;
  const expected = [];
  expect(channelsListV1(wrongToken)).toStrictEqual(expected);
});

test('channelsListV1: correct output for user being in a single channel', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const channel1 = channelsCreateV1(a.token, 'new', true) as channelId;
<<<<<<< HEAD:src/channelsList.test.ts
  const channelList = channelsListV1(a.token);
  const expectedList: channels [] = [
=======
  const channelList = channelsListV1(a.token) as {channels: channels[]};
  const channels: channels [] = [
>>>>>>> 0c0879ba9d6e229fe150e378f28504275a4982ae:src/channelsListV1.test.ts
    {
      channelId: channel1.channelId,
      name: 'new',
    }
  ];
  expect(channelList).toStrictEqual({ channels });
});

test('channelsListV1: correct output for user with no channels', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
<<<<<<< HEAD:src/channelsList.test.ts
  const channelList = channelsListV1(a.token);
  const expectedList: channels[] = [];
  expect(channelList).toStrictEqual(expectedList);
=======
  const b = authRegisterV1('Lebron.James@unsw.edu.au', '236', 'Lebron', 'James') as authUserId;
  const channel = channelsCreateV1(b.token, 'new', true) as channelId;
  const channelList = channelsListV1(a.token) as {channels: channels[]};
  const channels: channels[] = [];
  expect(channelList).toStrictEqual({ channels });
>>>>>>> 0c0879ba9d6e229fe150e378f28504275a4982ae:src/channelsListV1.test.ts
});

test('channelsListV1: correct output for one user being in multiple channels', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const channel1 = channelsCreateV1(a.token, 'new', true) as channelId;
  const channel2 = channelsCreateV1(a.token, 'new', false) as channelId;
  const channel3 = channelsCreateV1(a.token, 'new', true) as channelId;
  const channel4 = channelsCreateV1(a.token, 'new', true) as channelId;
<<<<<<< HEAD:src/channelsList.test.ts
  const channelList = channelsListV1(a.token);
  const expectedList: channels[] = [
=======
  const channelList = channelsListV1(a.token) as {channels: channels[]};
  const channels: channels[] = [
>>>>>>> 0c0879ba9d6e229fe150e378f28504275a4982ae:src/channelsListV1.test.ts
    {
      channelId: channel1.channelId,
      name: 'new',
    },
    {
      channelId: channel2.channelId,
      name: 'new0',
    },
    {
      channelId: channel3.channelId,
      name: 'new1',
    },
    {
      channelId: channel4.channelId,
      name: 'new2',
    },
  ];
  expect(channelList).toStrictEqual({ channels });
});
