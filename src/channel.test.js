import {channelsCreateV1} from './channels.js';
import {authRegisterV1} from './auth.js';
import { channelDetailsV1 } from './channel.js';
import { clearV1 } from './other.js'

let authid = -1;
let channelid = -1;

test('ChannelDetail error both invalid codes', ()=> {
    clearV1();
    expect(channelDetailsV1(authid, channelid)).toBe({error: 'error'});
})

authid = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor');
channelid = channelsCreateV1(authid, 'first', false);
let authid2 = authRegisterV1('bob@gmail.com', '2873', 'bob', 'green');

let channel = {
   channelId: channelid,
   channelName: 'Discussion',
   latestMsgStr: 'Hi!',
   isPublic: false,
   start: 5,
   ownerMemebers: [authid],
   allMembers: [authid]
}

let channeldetails = {
    name: channel.channelName,
    isPublic: channel.isPublic,
    ownerMembers: [authid],
    allMembers: [authid]
}

test('ChannelDetail error, userid not part of desired channel requested', ()=> {
    clearV1();
    expect(channelDetailsV1(authid2, channelid)).toBe({error: 'error'});
})

test('ChannelDetailsV1 working', ()=> {
    clearV1();
    expect(channelDetailsV1(authid, channelid)).toBe(channeldetails)
})