
import { channel, data, getData, setData, user } from "./dataStore";
import { channelInviteV1, channelJoinV1, channelDetailsV1, channelMessagesV1} from './channel';
import { channelsCreateV1, channelId} from './channels'
import { authRegisterV1, authUserId } from './auth';
import { clearV1 } from './other';



const validuser1 = authRegisterV1('another_cristiano@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo') as authUserId;
const validuser2 = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr') as authUserId;
const validchannel = channelsCreateV1(validuser1.authUserId, 'Discussion', true) as channelId;
const privatechannel = channelsCreateV1(validuser2.authUserId, 'Discussion', false) as channelId;


//create invalid users
const invaliduser: user = {
    uId: 6789,
    nameFirst: 'Post',
    nameLast: 'Malone',
    email: 'post.malone@unsw.edu.au',
    password: 'stoney',
    username: 'leondechino',
    isOnline: null,
    token: '23'
  }


// Channel invite works by verifying authuserid of the invite sender
// before calling the channelJoin command as both functions carry out the 
// same behaviour.
// As such under the assumption that my tests for channelJoinV1 are
// thorough, we only have to test for channelInviteV1 abillity to discern
// a valid authUserID and that the inviter is already in the channel.

test('channelInviteV1: invalid authuserId, valid uId, valid channel', () => {
    clearV1();
    
    let result = channelInviteV1(invaliduser.uId, validuser2.authUserId, validchannel.channelId)
    
    expect(result).toStrictEqual({error: 'error'});
  });

  test('channelInviteV1: valid authuserId (in channel), valid uId, valid channel', () => {
    clearV1();
    
    let result = channelInviteV1(validuser1.authUserId, validuser2.authUserId, validchannel.channelId)
    
    expect(result).toStrictEqual({error: 'error'});
  });

  test('channelInviteV1: valid authuserId (not in channel), valid uId, valid channel', () => {
    clearV1();
    
    let result = channelInviteV1(validuser2.authUserId, validuser1.authUserId, validchannel.channelId)
    
    expect(result).toStrictEqual({error: 'error'});
  });

