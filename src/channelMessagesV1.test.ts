import { channelInviteV1, channelJoinV1, channelDetailsV1, channelMessagesV1, returnMessages} from './channel';
import { channelsCreateV1, channelId } from './channels'
import { authRegisterV1, authUserId } from './auth';
import { clearV1 } from './other';

test('Channel Messages error when it recieves an invalid channel id', ()=> {
  clearV1();

  let authid = authRegisterV1('sean@gmail.com', '27hgfu37', 'Sean', 'OConnor') as authUserId;
  let channelid = channelsCreateV1(authid.authUserId, 'first', false) as channelId;
  
  expect(channelMessagesV1(authid.authUserId, 994, 0)).toStrictEqual({error: 'error'})

})

test('Channel Messages error when channel id valid but user is not part of channel', ()=> {
  clearV1();

  let authid = authRegisterV1('sean@gmail.com', '27hgfu37', 'Sean', 'OConnor') as authUserId;
  let channelid = channelsCreateV1(authid.authUserId, 'first', false) as channelId;
  let authid2 = authRegisterV1('bob@gmail.com', '27hgf6qs37', 'Bob', 'Jane') as authUserId;
  
  expect(channelMessagesV1(authid2.authUserId, channelid.channelId, 0)).toStrictEqual({error: 'error'})

})

test('Channel Messages error when start greater then length of messages', ()=> {
  clearV1();

  let authid = authRegisterV1('sean@gmail.com', '27hgfu37', 'Sean', 'OConnor') as authUserId;
  let channelid = channelsCreateV1(authid.authUserId, 'first', false) as channelId;
  
  expect(channelMessagesV1(authid.authUserId, channelid.channelId, 5)).toStrictEqual({error: 'error'})

})

test('Channel Messages when end greater then length of messages should return -1 for end', ()=> {
  clearV1();
  let authid = authRegisterV1('sean@gmail.com', '27hgfu37', 'Sean', 'OConnor') as authUserId;
  let channelid = channelsCreateV1(authid.authUserId, 'first', false) as channelId;

  let mes: returnMessages = {
    messages: [],
    start: 0,
    end: -1
  }

  expect(channelMessagesV1(authid.authUserId, channelid.channelId, 0)).toStrictEqual(mes)
})
