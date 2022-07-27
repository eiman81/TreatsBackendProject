import { channelExists, clearV1, findUser, userExists } from './other';
import { getData, getTokens, setData, setTokens, user } from './dataStore';
import {messageSendV1, channelMessagesV1, returnMessages, messageId } from './channel'

interface dmDetails {
    dmId: number,
    name: string
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dmCreateV1(token: string, uIds: number[]): {dmId: number} | {error: 'error'} {
  if (userExists(token)) {
    const data = getData();
    const user = findUser(token) as user;
    let highest = 995;

    for (let i = 0; i < data.channels.length; i++) {
      if (data.channels[i].channelId >= highest) {
        highest = data.channels[i].channelId;
      }
    }

    let handleStrings = [];

    for (let i = 0; i < uIds.length; i++) {
      if (findUser(uIds[i])) {
        if (handleStrings.includes(uIds[i]) === false) {
          const foundUser = findUser(uIds[i]) as user;
          handleStrings.push(foundUser.handleStr);
        } else {
          return { error: 'error' };
        }
      } else {
        return { error: 'error' };
      }
    }

    handleStrings = handleStrings.sort();
    let name = `${user.handleStr}`;
    for (const handle of handleStrings) {
      name = name + `, ${handle}`;
    }

    const dmId = highest + 5;
    uIds.push(user.uId);

    data.channels.push({
      channelId: dmId,
      name: name,
      numberOfMessages: 0,
      messages: [],
      isPublic: false,
      dm: true,
      ownerMembers: [user.uId],
      allMembers: uIds
    });

    setData(data);
    return {
      dmId: dmId,
    };
  } else {
    return { error: 'error' };
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dmListV1(token: string): {dms: dmDetails[]} | {error: 'error'} {
  if (userExists(token)) {
    const user = findUser(token) as user;
    const authId = user.uId;
    const dms = [];
    for (const channel of getData().channels) {
      if (channel.dm === true) {
        if (channel.allMembers.includes(authId)) {
          const DM = {
            dmId: channel.channelId,
            name: channel.name
          };
          dms.push(DM);
        }
      }
    }

    return {dms: dms};
  } else {
    return { error: 'error' };
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dmRemoveV1(token: string, dmId: number): {} | {error: 'error'} {
  if (userExists(token) && channelExists(dmId)) {
    const user = findUser(token) as user;
    let found = 0;
    let index = 0;
    for (const channel of getData().channels) {
      if (channel.channelId === dmId && channel.dm === true && channel.ownerMembers.includes(user.uId)) {
        found = 1;
        let data = getData();
        data.channels.splice(index, 1);
        setData(data);
      }
      index++;
    }

    if (found === 0) {
      return {error: 'error'}

    } else {
      return {};
    }
      
  } else {
    return { error: 'error' };
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dmDetailsV1(token: string, dmId: number): {name: string, members: number[]} | {error: 'error'} {
  if (userExists(token) && channelExists(dmId)) {
    const user = findUser(token) as user;
    let found = 0;
    for (const channel of getData().channels) {
      if (channel.channelId === dmId && channel.dm === true && channel.allMembers.includes(user.uId)) {
        found = 1;
        let dmDetails = {
          name: channel.name,
          members: channel.allMembers
        }
        return dmDetails;
      }
    }

    if (found === 0) {
        return {error: 'error'}
    }

  } else {
    return {error: 'error'}
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dmLeaveV1(token: string, dmId: number): {} | {error: 'error'} {
  if (userExists(token) && channelExists(dmId)) {
    const user = findUser(token) as user;
    let found = 0;
    let data = getData();
    let index = 0;
    for (const channel of getData().channels) {
      if (channel.channelId === dmId && channel.dm === true && channel.allMembers.includes(user.uId)) {
        found = 1;
        if (channel.ownerMembers.includes(user.uId)) {
          data.channels[index].ownerMembers = [];
          setData(data);

        } else {
          let index2 = 0;
          for (const id of channel.allMembers) {
            if (id === user.uId) {
              data.channels[index].allMembers.splice(index2, 1);
              setData(data);
            }

            index2++;
          }
        }
            
        return {};
      }

      index++;
    }
    
    if (found === 0) {
      return {error: 'error'}
    }
    
  } else {
    return {error: 'error'}
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dmMessagesV1(token: string, dmId: number, start: number): {error: 'error'} | returnMessages {
    if (userExists(token) && channelExists(dmId)) {
        let messages = channelMessagesV1(token, dmId, start) as returnMessages;
        return messages;
    
    } else {
        return {error: 'error'}
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function messageSendDmV1(token: string, dmId: number, message: string): {error: 'error'} | messageId {
    if (userExists(token) && channelExists(dmId)) {
        let messageId = messageSendV1(token, dmId, message);
        return messageId 
    } else {
        return {error: 'error'}
    }
}

export { dmCreateV1, dmListV1, dmRemoveV1, dmDetailsV1, dmLeaveV1, dmMessagesV1, messageSendDmV1 };
