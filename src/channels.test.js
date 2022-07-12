import {channelsCreateV1, channelsListV1, channelsListallV1} from './channels.js';
import {authRegisterV1} from './auth.js';
import {clearV1} from './other.js';

test('ChannelsListallV1 userId not found', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor').authUserId;
    const authid1 = -1005;
    channelsCreateV1(authid, 'first', true);
    expect(channelsListallV1(authid1)['channels']).toStrictEqual([]);
})

test('ChannelsListallV1 userId invalid', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor').authUserId;
    const authid1 = -1005;
    channelsCreateV1(authid, 'first', true);
    expect(channelsListallV1(authid1)['channels']).toStrictEqual([]);
})

test('ChannelsListallV1 working', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '27334ff7', 'Sean', 'OConnor').authUserId;
    const channel = channelsCreateV1(authid, 'first', true).channelId;
    let list = [ 
        {
            channelId: channel,
            name: 'first',
            latestMsg: null,
            numberOfMessages: null,
            messages: [],
            isPublic: true,
            ownerMembers: [authid],
            allMembers: [authid],
        }
    ];
    expect(channelsListallV1(authid)['channels']).toStrictEqual(list);
});

test('channelsCreateV1: error for name less than 1 character', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = channelsCreateV1(a,'',true);
  expect(b).toStrictEqual({ error: 'error' });
});

test('channelsCreateV1: error for name more than 20 characters', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = channelsCreateV1(a,'ThisIsAVeryLongName#1',true);
  expect(b).toStrictEqual({ error: 'error' });
});

test('channelsCreateV1: error for not boolean for isPublic', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = channelsCreateV1(a,'newChannel','right');
  expect(b).toStrictEqual({ error: 'error' });
});

test('channelsCreateV1: error for wrong UserId', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
  const b = channelsCreateV1(a + 1,'newChannel',false);
  expect(b).toStrictEqual({ error: 'error' });
});

test('channelsCreateV1: correct output for first created channel', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
  const b = channelsCreateV1(a,'newChannel',true).channelId;
  expect(b).toStrictEqual(1000);
});

test('channelsCreateV1: correct output for fifth created channel', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
  const b = channelsCreateV1(a,'newChannel',true).channelId;
  const c = channelsCreateV1(a,'newChannel',false).channelId;
  const d = channelsCreateV1(a,'newChannel',true).channelId;
  const e = channelsCreateV1(a,'newChannel',true).channelId;
  const f = channelsCreateV1(a,'newChannel',false).channelId;
  expect(f).toStrictEqual(1020);
});

// ---------------------------------------------------------------------

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

