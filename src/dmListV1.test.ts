import { channelId, channels } from './channels';
import { clearV1, authRegisterV1, channelsCreateV1, channelsListV1, Iter2Error, dmCreateV1 } from "./httpWrappers";
import { authUserId } from './auth';
import { dmDetails, dmId, dmListV1 } from './directMessages';

test('dmListV1: error for user not found', () => {
  clearV1();
  const token = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const wrongToken = 'wrong';
  const dmList = dmListV1(wrongToken);
  const expected: Iter2Error = { error: "error"};
  expect(dmList).toStrictEqual(expected);
});

test('dmListV1: correct output', () => {
  clearV1();
  const a = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
  const b = authRegisterV1('another_cristiano@unsw.edu.au', 'cristiano7', 'Cristiano', 'Ronaldo') as authUserId;;
  const c = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;;
  const d = authRegisterV1('zero0@unsw.edu.au', '12345678', 'ZERO', '0') as authUserId;
  const group1 = dmCreateV1(a.token, [a.authUserId, b.authUserId, c.authUserId]) as dmId;
  const group2 = dmCreateV1(b.token, [a.authUserId, b.authUserId]) as dmId;
  const group3 = dmCreateV1(d.token, [b.authUserId, c.authUserId, d.authUserId]) as dmId;
  const dmList = dmListV1(a.token);
  const expected: dmDetails[] = [
    {dmId: group1.dmId, name: "cristianoronaldo, cristianoronaldo1, mohammadmayweatherjr"},
    {dmId: group2.dmId, name: "cristianoronaldo, cristianoronaldo1"},
  ];
  expect(dmList).toStrictEqual(expected);
});