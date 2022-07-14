import {channelsCreateV1, channelsListV1, channelsListallV1, channelId, channels} from './channels';
import {authRegisterV1, authUserId} from './auth';
import {clearV1} from './other';
import { channel } from './dataStore';

test('ChannelsListallV1 userId not found', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor') as authUserId;
    const authid1 = -1005;
    channelsCreateV1(authid.authUserId, 'first', true);
    expect(channelsListallV1(authid1) as channels[]).toStrictEqual([]);
})

test('ChannelsListallV1 userId invalid', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor') as authUserId;
    const authid1 = -1005;
    channelsCreateV1(authid.authUserId, 'first', true);
    expect(channelsListallV1(authid1) as channel[]).toStrictEqual([]);
})

test('ChannelsListallV1 working', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '27334ff7', 'Sean', 'OConnor') as authUserId;
    const channel = channelsCreateV1(authid.authUserId, 'first', true) as channelId;
    let list: channels[] = [ 
        {
            channelId: channel.channelId,
            name: 'first',
        }
    ];
    const result = channelsListallV1(authid.authUserId) as channels[];
    expect(result).toStrictEqual(list);
});


