import {channelsCreateV1, channelsListV1, channelsListallV1, channelId, channels} from './channels';
import {authRegisterV1, authUserId} from './auth';
import {clearV1} from './other';

test('ChannelsListV1: error for userId not found', ()=> {
    clearV1();
    const authid = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const wrongId = 1005;
    const channel = channelsCreateV1(wrongId, 'new', false) as channelId;
    let expected = { error: 'error' };
    expect(channelsListV1(wrongId)).toStrictEqual(expected);
})


test('channelsListV1: correct output for user being in a single channel', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const channel1 = channelsCreateV1(a.authUserId,'new',true) as channelId;
  let channelList = channelsListV1(a.authUserId) as channels[];
  let expectedList: channels [] = [
    {
      channelId: channel1.channelId,
      name: 'new',
    }
  ];
  expect(channelList).toStrictEqual(expectedList);
});


test('channelsListV1: correct output for user with no channels', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const channel = channelsCreateV1(123,'new',true) as channelId;
  let channelList = channelsListV1(a.authUserId) as channels[];
  let expectedList: channels[] = [];
  expect(channelList).toStrictEqual(expectedList);
});


test('channelsListV1: correct output for one user being in multiple channels', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const channel1 = channelsCreateV1(a.authUserId,'new',true) as channelId;
  const channel2 = channelsCreateV1(a.authUserId,'new',false) as channelId;
  const channel3 = channelsCreateV1(a.authUserId,'new',true) as channelId;
  const channel4 = channelsCreateV1(a.authUserId,'new',true) as channelId;
  let channelList = channelsListV1(a.authUserId) as channels[];
  let expectedList: channels[] = [
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
  expect(channelList).toStrictEqual(expectedList);
});

