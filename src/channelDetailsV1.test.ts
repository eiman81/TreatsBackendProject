
import { getData, setData } from "./dataStore.js";
import { channelInviteV1, channelJoinV1, channelDetailsV1, channelMessagesV1} from './channel.js';
import { channelsCreateV1 } from './channels.js'
import { authRegisterV1 } from './auth.js';
import { clearV1 } from './other.js';


test('ChannelDetail error both invalid codes', ()=> {
    clearV1();

    let authid = -1;
    let channelid = -1;
    expect(channelDetailsV1(authid, channelid)).toStrictEqual({error: 'error'});
})

test('ChannelDetail error, userid not part of desired channel requested', ()=> {
    clearV1();

    let authid = authRegisterV1('sean@gmail.com', '2737svww', 'Sean', 'OConnor').authUserId;
    let channelid = channelsCreateV1(authid, 'first', false).channelId;
    let authid2 = authRegisterV1('bob@gmail.com', '287swvw3', 'bob', 'green').authUserId;

    expect(channelDetailsV1(authid2, channelid)).toStrictEqual({error: 'error'});
})

test('ChannelDetailsV1 working', ()=> {
    clearV1();
    
    let authid = authRegisterV1('sean@gmail.com', '27hgfu37', 'Sean', 'OConnor').authUserId;
    let channelid = channelsCreateV1(authid, 'first', false).channelId;
    
    let channeldetails = {
        name: 'first',
        isPublic: false,
        ownerMembers: [authid],
        allMembers: [authid]
    }
    expect(channelDetailsV1(authid, channelid)).toStrictEqual(channeldetails)
})
