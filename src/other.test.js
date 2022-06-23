import { setData } from "./dataStore.js";
import { clearV1 } from './other.js';

test('Clear test', ()=> {
    
    let user = {
        uId: 7,
        nameFirst: 'Cristiano',
        nameLast: 'Ronaldo',
        email: 'crisronaldosui@gmail.com',
        passwor: 'suiiiiiiiiii',
        handleStr: 'cristianoronaldo', 
        userRole: 'Admin',
        isOnline: true,
    };

    let channel = {
        channelId: 1,
        channelName: 'Discussion',
        latestMsgStr: 'Hi!',
        isPublic: 'false',
        start: 5,
        ownerMembers: [4],
        allMembers: [4]
    }

    let data = {
        users: user,
        channels: channel
    }
    setData(data);
    let nodata = {
        users: [],
        channels: []
    };
    
    expect(clearV1()).toStrictEqual(nodata);
});
