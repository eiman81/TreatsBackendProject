import {channelsCreateV1, channelsListallV1} from './channels.js';
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
            isPublic: true,
        //  start: 5,
            ownerMembers: [authid],
            allMembers: [authid]
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

test('channelsCreateV1: error for wrong authUserId', () => {
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
