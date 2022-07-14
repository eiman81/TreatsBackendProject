import {channelsCreateV1, channelsListV1, channelsListallV1, channelId} from './channels';
import {authRegisterV1, authUserId} from './auth';
import {clearV1} from './other';

test('channelsCreateV1: error for name less than 1 character', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = channelsCreateV1(a.authUserId,'',true);
  expect(b).toStrictEqual({ error: 'error' });
});

test('channelsCreateV1: error for name more than 20 characters', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = channelsCreateV1(a.authUserId,'ThisIsAVeryLongName#1',true);
  expect(b).toStrictEqual({ error: 'error' });
});

test('channelsCreateV1: error for wrong UserId', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = channelsCreateV1(a.authUserId + 1,'newChannel',false);
  expect(b).toStrictEqual({ error: 'error' });
});

test('channelsCreateV1: correct output for first created channel', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = channelsCreateV1(a.authUserId,'newChannel',true) as channelId;
  expect(b.channelId).toStrictEqual(1000);
});

test('channelsCreateV1: correct output for fifth created channel', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = channelsCreateV1(a.authUserId,'newChannel',true) as channelId;
  const c = channelsCreateV1(a.authUserId,'newChannel',false) as channelId;
  const d = channelsCreateV1(a.authUserId,'newChannel',true) as channelId;
  const e = channelsCreateV1(a.authUserId,'newChannel',true) as channelId;
  const f = channelsCreateV1(a.authUserId,'newChannel',false) as channelId;
  expect(f.channelId).toStrictEqual(1020);
});

// ---------------------------------------------------------------------
