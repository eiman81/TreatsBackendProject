import { channelId, channels } from './channels';
import { clearV1, authRegisterV1, channelsCreateV1, channelsListallV1 } from './httpWrappers';
import { authUserId } from './auth';

test('ChannelsListallV1 userId not found', () => {
  clearV1();
  const token = authRegisterV1('sean@gmail.com', '27rfvg37', 'Sean', 'OConnor') as authUserId;
  const token1 = 'hohoho';
  channelsCreateV1(token.token, 'first', true);
  const channels: channels[] = [];
  expect(channelsListallV1(token1)).toStrictEqual({ channels });
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
  const result = channelsListallV1(token.token);
  expect(result).toStrictEqual({ channels });
});
