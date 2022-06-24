import {channelsCreateV1, channelsListallV1} from './channels';
import {authRegisterV1} from './auth';
import {clearV1} from './dataStore'

test('ChannelsListallV1 userId not found', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor');
    const authid1 = -1005;
    channelsCreateV1(authid, 'first', true);
    expect(channelsListallV1(authid1)).toBe([]);
})

test('ChannelsListallV1 userId invalid', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor');
    const authid1 = -1005;
    channelsCreateV1(authid, 'first', true);
    expect(channelsListallV1(authid1)).toBe([]);
})

test('ChannelsListallV1 working', ()=> {
    clearV1();
    const authid = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor');
    const channel = channelsCreateV1(authid, 'first', true);
    let list = [ 
        {
            channelId: channel,
            channelName: 'first',
        //  latestMsgStr: 'Hi!',
            isPublic: true,
        //  start: 5,
            ownerMembers: [authid],
            allMembers: [authid]
        }
    ];

    expect(channelsListallV1(authid)).toBe(list);
})
