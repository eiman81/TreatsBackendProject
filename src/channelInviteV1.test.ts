
import { getData, setData } from "./dataStore.js";
import { channelInviteV1, channelJoinV1, channelDetailsV1, channelMessagesV1} from './channel.js';
import { channelsCreateV1 } from './channels.js'
import { authRegisterV1 } from './auth.js';
import { clearV1 } from './other.js';



const validuser1 = authRegisterV1('another_cristiano@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo').authUserId;
const validuser2 = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr').authUserId;
const validchannel = channelsCreateV1(validuser1, 'Discussion', true).channelId;
const privatechannel = channelsCreateV1(validuser2, 'Discussion', false).channelId;


//create invalid users
const invaliduser = {
    uId: 6789,
    nameFirst: 'Post',
    nameLast: 'Malone',
    email: 'post.malone@unsw.edu.au',
    password: 'stoney',
    username: 'leondechino',
    userRole: null,
    isOnline: null,
  }

  const invalidchannel = {
    channelId: 7890,
    channelName: 'Argument',
    latestMsg: 'Shut Up!!',
    isPublic: 'true',
    password: null,//'comp1531' //empty if 'isPublic' is true
    ownerMembers: [],
    allMembers: [],
}


let data = {
    users: [validuser1, validuser2],
    channels: [validchannel, privatechannel],
}
setData(data);



// Channel invite works by verifying authuserid of the invite sender
// before calling the channelJoin command as both functions carry out the 
// same behaviour.
// As such under the assumption that my tests for channelJoinV1 are
// thorough, we only have to test for channelInviteV1 abillity to discern
// a valid authUserID and that the inviter is already in the channel.

test('channelInviteV1: invalid authuserId, valid uId, valid channel', () => {
    clearV1();
    
    let result = channelInviteV1(invaliduser.uId, validuser2, validchannel.channelId)
    
    expect(result).toStrictEqual({error: 'error'});
  });

  test('channelInviteV1: valid authuserId (in channel), valid uId, valid channel', () => {
    clearV1();
    
    let result = channelInviteV1(validuser1, validuser2, validchannel.channelId)
    
    expect(result).toStrictEqual({error: 'error'});
  });

  test('channelInviteV1: valid authuserId (not in channel), valid uId, valid channel', () => {
    clearV1();
    
    let result = channelInviteV1(validuser2, validuser1, validchannel.channelId)
    
    expect(result).toStrictEqual({error: 'error'});
  });

