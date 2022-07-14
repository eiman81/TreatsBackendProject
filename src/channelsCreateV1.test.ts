import {channelsCreateV1, channelsListV1, channelsListallV1} from './channels';
import {authRegisterV1} from './auth';
import {clearV1} from './other';

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
