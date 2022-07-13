import { authRegisterV1, authUserId } from './auth.js';
import { channelsCreateV1 } from './channels.js';
import { clearV1 } from './other.js';

test('Clear test', ()=> {
    const user = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
    const userId = user.authUserId;
    const channel = channelsCreateV1(userId,'',true);
    let nodata = {
        users: [],
        channels: []
    };
    expect(clearV1()).toStrictEqual(nodata); 
});

