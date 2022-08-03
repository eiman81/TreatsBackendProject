import { clearV1, authRegisterV1, channelsCreateV1, channelMessagesV1, messageSendV1, messageEditV1} from './httpWrappers';
import { returnMessages, messageId } from './channel';
import { channelId } from './channels';
import { authUserId } from './auth';

test('ChannelMessageEdit Working', () => {
  clearV1();
  const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
  const channel = channelsCreateV1(user.token, 'newchannel', false) as channelId;
  const messageid = messageSendV1(user.token, channel.channelId, 'is this working?') as messageId;
  const messages = channelMessagesV1(user.token, channel.channelId, 0) as returnMessages;
  messageEditV1(user.token, messageid.messageId, 'yeah it is!');
  const id = messages.messages[0].messageId;
  expect(id).toStrictEqual(messageid.messageId);
});

test('ChannelMessageEdit error when new message too long', () => {
  clearV1();
  const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
  const channel = channelsCreateV1(user.token, 'newchannel', false) as channelId;
  const messageid = messageSendV1(user.token, channel.channelId, 'is this working?') as messageId;
  const longstring = 'a'.repeat(1001);
  expect(messageEditV1(user.token, messageid.messageId, 'i dont think this will work'+ longstring)).toStrictEqual({ error: 'error' });
});

test('ChannelMessageEdit error when invalid messageId', () => {
    clearV1();
    const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
    const channel = channelsCreateV1(user.token, 'newchannel', false) as channelId;
    const messageid = messageSendV1(user.token, channel.channelId, 'is this working?') as messageId;
    expect(messageEditV1(user.token, 3267, 'i dont think this will work')).toStrictEqual({ error: 'error' });
});


test('ChannelMessageEdit error when message wasnt sent by auth user', () => {
    clearV1();
    const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
    const user2 = authRegisterV1('adi.muthukattu@gmail.com', '5qwerty', 'adi', 'muthukattu') as authUserId;
    const channel = channelsCreateV1(user.token, 'newchannel', false) as channelId;
    const messageid = messageSendV1(user.token, channel.channelId, 'is this working?') as messageId;

    expect(messageEditV1(user2.token, messageid.messageId, 'i dont think this will work')).toStrictEqual({ error: 'error' });
  });


test('ChannelMessageEdit error when user is not an owner', () => {
    clearV1();
    const user = authRegisterV1('sean.ocononnor@gmail.com', 'qwerty5', 'sean', 'oconnor') as authUserId;
    const user2 = authRegisterV1('adi.muthukattu@gmail.com', '5qwerty', 'adi', 'muthukattu') as authUserId;
    const channel = channelsCreateV1(user.token, 'newchannel', false) as channelId;
    const messageid = messageSendV1(user2.token, channel.channelId, 'is this working?') as messageId;

    expect(messageEditV1(user2.token, messageid.messageId, 'i dont think this will work')).toStrictEqual({ error: 'error' });
});
