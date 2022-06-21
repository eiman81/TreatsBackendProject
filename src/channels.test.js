import {channelsCreateV1, channelsListallV1} from './channels.js';
import {authRegisterV1} from './auth.js';


const authid = authRegisterV1('sean@gmail.com', '2737', 'Sean', 'OConnor');

test('ChannelsListallV1 userId not found', ()=> {
    expect(channelsListallV1(authid)).toBe([]);
})

const channel = channelsCreateV1(authid, 'first', 'No');

let getData = {
    users: [{uId: authid}],
    channels: [channel]
}

test('ChannelsListallV1 working', ()=> {
    clearV1();
    expect(channelsListallV1(authid)).toBe(getData.channels);
})





