
import {channelsCreateV1, channelsListV1, channelsListallV1} from './channels.js';
import {authRegisterV1} from './auth.js';
import {clearV1} from './other.js';

test('ChannelsListallV1 userId not found', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor');
    const authid1 = -1005;
    channelsCreateV1(authid, 'first', true);
    expect(channelsListallV1(authid1)).toStrictEqual([]);
})

test('ChannelsListallV1 userId invalid', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor');
    const authid1 = -1005;
    channelsCreateV1(authid, 'first', true);
    expect(channelsListallV1(authid1)).toStrictEqual([]);
})

test('ChannelsListallV1 working', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '27334ff7', 'Sean', 'OConnor');
    const channel = channelsCreateV1(authid, 'first', true);
    let list = [ 
        {
            channelId: channel,
            channelName: 'first',
            latestMsg: null,
            numberOfMessages: null,
            messages: [],
            isPublic: true,
            ownerMembers: [authid],
            allMembers: [authid],
        }
    ];
    expect(channelsListallV1(authid)).toStrictEqual(list);
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
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = channelsCreateV1(a + 1,'newChannel',false);
  expect(b).toStrictEqual({ error: 'error' });
});

test('channelsCreateV1: correct output for first created channel', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = channelsCreateV1(a,'newChannel',true);
  expect(b).toStrictEqual(1000);
});

test('channelsCreateV1: correct output for fifth created channel', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const b = channelsCreateV1(a,'newChannel',true);
  const c = channelsCreateV1(a,'newChannel',false);
  const d = channelsCreateV1(a,'newChannel',true);
  const e = channelsCreateV1(a,'newChannel',true);
  const f = channelsCreateV1(a,'newChannel',false);
  expect(f).toStrictEqual(1020);
});

// ---------------------------------------------------------------------

test('ChannelsListV1: error for userId not found', ()=> {
    clearV1();
    const authid = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
    const wrongId = 1005;
    const channel = channelsCreateV1(wrongId, 'new', false);
    let expected = { error: 'error' };
    expect(channelsListV1(wrongId)).toStrictEqual(expected);
})


test('channelsListV1: correct output for user being in a single channel', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const channel = channelsCreateV1(a,'new',true);
  let channelList = channelsListV1(a);
  let expectedList = [
    {
      channelId: channel,
      channelName: 'new',
      latestMsg: null,
      numberOfMessages: null,
      messages: [],
      isPublic: true,
      ownerMembers: [a],
      allMembers: [a],
    }
  ];
  expect(channelList).toStrictEqual(expectedList);
});


test('channelsListV1: correct output for user with no channels', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const channel = channelsCreateV1(123,'new',true);
  let channelList = channelsListV1(a);
  let expectedList = [];
  expect(channelList).toStrictEqual(expectedList);
});


test('channelsListV1: correct output for one user being in multiple channels', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
  const channel1 = channelsCreateV1(a,'new',true);
  const channel2 = channelsCreateV1(a,'new',false);
  const channel3 = channelsCreateV1(a,'new',true);
  const channel4 = channelsCreateV1(a,'new',true);
  let channelList = channelsListV1(a);
  let expectedList = [
    {
      channelId: channel1,
      channelName: 'new',
      latestMsg: null,
      numberOfMessages: null,
      messages: [],
      isPublic: true,
      ownerMembers: [a],
      allMembers: [a],
    },
    {
      channelId: channel2,
      channelName: 'new0',
      latestMsg: null,
      numberOfMessages: null,
      messages: [],
      isPublic: false,
      ownerMembers: [a],
      allMembers: [a],
    },
    {
      channelId: channel3,
      channelName: 'new1',
      latestMsg: null,
      numberOfMessages: null,
      messages: [],
      isPublic: true,
      ownerMembers: [a],
      allMembers: [a],
    },
    {
      channelId: channel4,
      channelName: 'new2',
      latestMsg: null,
      numberOfMessages: null,
      messages: [],
      isPublic: true,
      ownerMembers: [a],
      allMembers: [a],
    },
  ];
  expect(channelList).toStrictEqual(expectedList);
});


