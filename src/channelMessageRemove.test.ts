import { clearV1, authRegisterV1, channelsCreateV1, channelMessagesV1, messageSendV1, messageRemoveV1} from './httpWrappers';
import { returnMessages, messageId } from './channel';
import { channelId } from './channels';
import { authUserId } from './auth';


test('ChannelmessageRemove Working', () => {
  clearV1();
  const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
  const channel = channelsCreateV1(user.token, 'newchannel', false) as channelId;
  const messageid = messageSendV1(user.token, channel.channelId, 'is this working?') as messageId;
  expect(messageRemoveV1(user.token, messageid.messageId)).toStrictEqual({});
});

test('ChannelmessageRemove error when invalid messageId', () => {
    clearV1();
    const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
    const channel = channelsCreateV1(user.token, 'newchannel', false) as channelId;
    const messageid = messageSendV1(user.token, channel.channelId, 'is this working?') as messageId;
    expect(messageRemoveV1(user.token, 8359)).toStrictEqual({ error: 'error' });
});


test('ChannelmessageRemove error when message wasnt sent by auth user', () => {
    clearV1();
    const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
    const user2 = authRegisterV1('adi.muthukattu@gmail.com', '5qwerty', 'adi', 'muthukattu') as authUserId;
    const channel = channelsCreateV1(user.token, 'newchannel', false) as channelId;
    const messageid = messageSendV1(user.token, channel.channelId, 'is this working?') as messageId;

    expect(messageRemoveV1(user2.token, messageid.messageId)).toStrictEqual({ error: 'error' });
  });


test('ChannelmessageRemove error when user is not an owner', () => {
    clearV1();
    const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
    const user2 = authRegisterV1('adi.muthukattu@gmail.com', '5qwerty', 'adi', 'muthukattu') as authUserId;
    const channel = channelsCreateV1(user.token, 'newchannel', false) as channelId;
    const messageid = messageSendV1(user2.token, channel.channelId, 'is this working?') as messageId;

    expect(messageRemoveV1(user2.token, messageid.messageId)).toStrictEqual({ error: 'error' });
});
