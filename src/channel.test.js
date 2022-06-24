import { channelMessagesV1 } from "./channel";
import { getData, setData } from "./dataStore";
import { authRegisterV1 } from './auth';
import { clearV1 } from './other';

const a = authRegisterV1('mohammed.mayweatherjr@unsw.edu.au', 'notfloyd', 'Mohammed', 'MayweatherJr');
const user1  = {
  uId: -1000,
  nameFirst: 'Mohammed',
  nameLast: 'MayweatherJr',
  email: 'mohammed.mayweatherjr@unsw.edu.au',
  password: 'notfloyd',
  username: 'mohammedmayweatherjr',
  userRole: null,
  isOnline: null,
}

const b = authRegisterV1('cristiano.ronaldo@unsw.edu.au', '123456', 'Cristiano', 'Ronaldo');
const user2   = {
  uId: -1005,
  nameFirst: 'Cristiano',
  nameLast: 'Ronaldo',
  email: 'cristiano.ronaldo@unsw.edu.au',
  password: '123456',
  username: 'cristianoronaldo',
  userRole: null,
  isOnline: null,
}

const channel1 = {
  channelId: 1,
  channelName: 'Discussion',
  messages: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
             '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
             '30', '31', '32', '33','34', '35', '36', '37', '38', '39', '40', '41', '42', '43',
             '44', '45', '46', '47', '48', '49', '50'],
  allMembers: [user1],
}
count += 1;

const channel2 = {
  channelId: 2,
  channelName: 'Argument',
  messages: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  allMembers: [user1, user2],
}

let data = {
    channels: [channel1, channel2],
}
setData(data);

test('channelMessagesV1: return messages between start and start + 50', () => {
  clearV1();
  let result = channelMessagesV1(user1.uId, channel1.channelId, 0);
  
  expect(result).toStrictEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
  '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
  '30', '31', '32', '33','34', '35', '36', '37', '38', '39', '40', '41', '42', '43',
  '44', '45', '46', '47', '48', '49', '50'], 0, 50);
});
