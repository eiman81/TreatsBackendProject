import {channelsListallV1} from './channels.js';

test('ChannelsListallV1 invalid userId', ()=> {
    expect(channelsListallV1(-36)).toBe([]);
})

