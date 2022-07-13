import {channelsCreateV1, channelsListV1, channelsListallV1} from './channels.js';
import {authRegisterV1} from './auth.js';
import {clearV1} from './other.js';

test('ChannelsListallV1 userId not found', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor').authUserId;
    const authid1 = -1005;
    channelsCreateV1(authid, 'first', true);
    expect(channelsListallV1(authid1)['channels']).toStrictEqual([]);
})

test('ChannelsListallV1 userId invalid', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor').authUserId;
    const authid1 = -1005;
    channelsCreateV1(authid, 'first', true);
    expect(channelsListallV1(authid1)['channels']).toStrictEqual([]);
})

test('ChannelsListallV1 working', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '27334ff7', 'Sean', 'OConnor').authUserId;
    const channel = channelsCreateV1(authid, 'first', true).channelId;
    let list = [ 
        {
            channelId: channel,
            name: 'first',
            latestMsg: null,
            numberOfMessages: null,
            messages: [],
            isPublic: true,
            ownerMembers: [authid],
            allMembers: [authid],
        }
    ];
    expect(channelsListallV1(authid)['channels']).toStrictEqual(list);
});


