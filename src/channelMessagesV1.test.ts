import { getData, setData } from "./dataStore";
import { channelInviteV1, channelJoinV1, channelDetailsV1, channelMessagesV1} from './channel';
import { channelsCreateV1 } from './channels'
import { authRegisterV1 } from './auth';
import { clearV1 } from './other';

test('Channel Messages error when it recieves an invalid channel id', ()=> {
  clearV1();

  let authid = authRegisterV1('sean@gmail.com', '27hgfu37', 'Sean', 'OConnor').authUserId;
  let channelid = channelsCreateV1(authid, 'first', false).channelId;
  
  expect(channelMessagesV1(authid, 994, 0)).toStrictEqual({error: 'error'})

})

test('Channel Messages error when channel id valid but user is not part of channel', ()=> {
  clearV1();

  let authid = authRegisterV1('sean@gmail.com', '27hgfu37', 'Sean', 'OConnor').authUserId;
  let channelid = channelsCreateV1(authid, 'first', false).channelId;
  let authid2 = authRegisterV1('bob@gmail.com', '27hgf6qs37', 'Bob', 'Jane').authUserId;
  
  expect(channelMessagesV1(authid2, channelid, 0)).toStrictEqual({error: 'error'})

})

test('Channel Messages error when start greater then length of messages', ()=> {
  clearV1();

  let authid = authRegisterV1('sean@gmail.com', '27hgfu37', 'Sean', 'OConnor').authUserId;
  let channelid = channelsCreateV1(authid, 'first', false).channelId;
  
  expect(channelMessagesV1(authid, channelid, 5)).toStrictEqual({error: 'error'})

})

test('Channel Messages when end greater then length of messages should return -1 for end', ()=> {
  clearV1();
  let authid = authRegisterV1('sean@gmail.com', '27hgfu37', 'Sean', 'OConnor').authUserId;
  let channelid = channelsCreateV1(authid, 'first', false).channelId;

  let mes = {
    messages: [],
    start: 0,
    end: -1
  }

  expect(channelMessagesV1(authid, channelid, 0)).toStrictEqual(mes)
})
