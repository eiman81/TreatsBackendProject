import {channelsCreateV1, channelsListV1, channelsListallV1} from './channels';
import {authRegisterV1} from './auth';
import {clearV1} from './other';

test('ChannelsListV1: error for userId not found', ()=> {
    clearV1();
    const authid = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
    const wrongId = 1005;
    const channel = channelsCreateV1(wrongId, 'new', false)['channelId'];
    let expected = { error: 'error' };
    expect(channelsListV1(wrongId)).toStrictEqual(expected);
})


test('channelsListV1: correct output for user being in a single channel', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
  const channel = channelsCreateV1(a,'new',true).channelId;
  let channelList = channelsListV1(a);
  let expectedList = [
    {
      channelId: channel,
      name: 'new',
      latestMsg: null,
      numberOfMessages: null,
      messages: [],
      isPublic: true,
      ownerMembers: [a],
      allMembers: [a],
    }
  ];
  expect(channelList['channels']).toStrictEqual(expectedList);
});


test('channelsListV1: correct output for user with no channels', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
  const channel = channelsCreateV1(123,'new',true).channelId;
  let channelList = channelsListV1(a);
  let expectedList = [];
  expect(channelList['channels']).toStrictEqual(expectedList);
});


test('channelsListV1: correct output for one user being in multiple channels', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
  const channel1 = channelsCreateV1(a,'new',true).channelId;
  const channel2 = channelsCreateV1(a,'new',false).channelId;
  const channel3 = channelsCreateV1(a,'new',true).channelId;
  const channel4 = channelsCreateV1(a,'new',true).channelId;
  let channelList = channelsListV1(a);
  let expectedList = [
    {
      channelId: channel1,
      name: 'new',
      latestMsg: null,
      numberOfMessages: null,
      messages: [],
      isPublic: true,
      ownerMembers: [a],
      allMembers: [a],
    },
    {
      channelId: channel2,
      name: 'new0',
      latestMsg: null,
      numberOfMessages: null,
      messages: [],
      isPublic: false,
      ownerMembers: [a],
      allMembers: [a],
    },
    {
      channelId: channel3,
      name: 'new1',
      latestMsg: null,
      numberOfMessages: null,
      messages: [],
      isPublic: true,
      ownerMembers: [a],
      allMembers: [a],
    },
    {
      channelId: channel4,
      name: 'new2',
      latestMsg: null,
      numberOfMessages: null,
      messages: [],
      isPublic: true,
      ownerMembers: [a],
      allMembers: [a],
    },
  ];
  expect(channelList['channels']).toStrictEqual(expectedList);
});

