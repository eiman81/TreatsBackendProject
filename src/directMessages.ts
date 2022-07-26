import express, { json, Request, Response } from 'express';
import { echo } from './echo';
import morgan from 'morgan';
import config from './config.json';
import cors from 'cors';
import { authRegisterV1, authLoginV1, authUserId, authLogoutV1 } from './auth';
import { channelsCreateV1, channelsListV1, channelsListallV1 } from './channels';
import { messageSendV1, messageEditV1, messageRemoveV1 } from './channel';
import { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1, channelLeaveV1, channelAddOwnerV1, channelRemoveOwnerV1 } from './channel';
import { userProfileV1 } from './users';
import { clearV1, findUser, userExists } from './other';
import { getData, getTokens, setData, setTokens, user } from './dataStore';

interface dmDetails {
    dmId: number,
    name: string
}



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
            return {error: 'error'}
        }
      } else {
        return {error: 'error'}
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
    return {error: 'error'}
  }
}

function dmListV1(token): dmDetails[] | {error: 'error'} {
  if (userExists(token)) {
    const user = findUser(token) as user;
    const authId = user.uId;
    let dms = [];
    for (const channel of getData().channels) {
        if (channel.dm === true) {
            if (channel.allMembers.includes(authId)) {
                let DM = {
                    dmId: channel.channelId,
                    name: channel.name
                }
                dms.push(DM);
            }
        }
    }

    return dms

  } else {
    return {error: 'error'}
  }
}

export { dmCreateV1, dmListV1 };
