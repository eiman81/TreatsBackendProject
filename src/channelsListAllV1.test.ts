import { channelsCreateV1, channelsListV1, channelsListallV1, channelId, channels } from './channels';
import { authRegisterV1, authUserId } from './auth';
import { clearV1 } from './other';
import { channel } from './dataStore';

test('ChannelsListallV1 userId not found', () => {
  clearV1();
  const token = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor') as authUserId;
  const token1 = 'hohoho';
  channelsCreateV1(token.token, 'first', true);
  expect(channelsListallV1(token1) as {channels: channels[]}).toStrictEqual({ channels: [] });
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
  const result = channelsListallV1(token.token) as {channels: channels[]};
  expect(result).toStrictEqual({ channels });
});
