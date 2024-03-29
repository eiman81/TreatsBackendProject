import { channelId, channels } from './channels';
import { clearV1, authRegisterV1, channelsCreateV1, channelsListV1 } from './httpWrappers';
import { authUserId } from './auth';

test('ChannelsListV1: error for userId not found', () => {
  clearV1();
  const token = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const wrongToken = 'wrong';
  const channel = channelsCreateV1(wrongToken, 'new', false) as channelId;
  const channels: channels [] = [];
  expect(channelsListV1(wrongToken)).toStrictEqual({ channels });
});

test('channelsListV1: correct output for user being in a single channel', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const channel1 = channelsCreateV1(a.token, 'new', true) as channelId;
  const channelList = channelsListV1(a.token);
  const channels: channels [] = [
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
  const channelList = channelsListV1(a.token);
  const channels: channels[] = [];
  expect(channelList).toStrictEqual({ channels });
});

test('channelsListV1: correct output for one user being in multiple channels', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const channel1 = channelsCreateV1(a.token, 'new', true) as channelId;
  const channel2 = channelsCreateV1(a.token, 'new', false) as channelId;
  const channel3 = channelsCreateV1(a.token, 'new', true) as channelId;
  const channel4 = channelsCreateV1(a.token, 'new', true) as channelId;
  const channelList = channelsListV1(a.token);
  const channels: channels[] = [
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
