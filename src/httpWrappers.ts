import { url, port } from './config.json';

import request from 'sync-request';
import { channels } from './channels';
import { channeldetails, returnMessages, messageId } from './channel';
import { token } from 'morgan';
import { dmDetails } from './directMessages';
import isEmail from 'validator/lib/isEmail';
import { userProfile } from './users';

export type Iter2Error = {error: 'error'};

export type clearV1Fn = () => {};

export const clearV1: clearV1Fn = () => {
  const res = request(
    'DELETE',
    `${url}:${port}/clear/v1`
  );

  return {};
};

export type authRegisterV1Fn = (email: string, password: string, nameFirst: string, nameLast: string) => { token: string, authUserId: number } | Iter2Error;

export const authRegisterV1: authRegisterV1Fn = (email: string, password: string, nameFirst: string, nameLast: string) => {
  const res = request(
    'POST',
        `${url}:${port}/auth/register/v2`,
        {
          json: {
            email: email,
            password: password,
            nameFirst: nameFirst,
            nameLast: nameLast,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type authLoginV1Fn = (email: string, password: string) => { token: string, authUserId: number } | Iter2Error;

export const authLoginV1: authLoginV1Fn = (email: string, password: string) => {
  const res = request(
    'POST',
        `${url}:${port}/auth/login/v2`,
        {
          json: {
            email: email,
            password: password,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type authLogoutV1Fn = (token: string) => {} | Iter2Error;

export const authLogoutV1: authLogoutV1Fn = (token: string) => {
  const res = request(
    'POST',
        `${url}:${port}/auth/logout/v1`,
        {
          json: {
            token: token,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type userProfileV1Fn = (token: string, uId: number) => {uId: number, nameFirst: string, nameLast: string, email: string, handleStr: string} | Iter2Error;

export const userProfileV1: userProfileV1Fn = (token: string, uId: number) => {
  const res = request(
    'GET',
        `${url}:${port}/user/profile/v2`,
        {
          qs: {
            token: token,
            uId: uId,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type userProfileSetNameV1Fn = (token: string, nameFirst: string, nameLast: string) => {} | Iter2Error;

export const userProfileSetNameV1: userProfileSetNameV1Fn = (token: string, nameFirst: string, nameLast: string) => {
  const res = request(
    'PUT',
        `${url}:${port}/user/profile/setname/v1`,
        {
          json: {
            token: token,
            nameFirst: nameFirst,
            nameLast: nameLast,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type userProfileSetEmailV1Fn = (token: string, email: string) => {} | Iter2Error;

export const userProfileSetEmailV1: userProfileSetEmailV1Fn = (token: string, email: string) => {
  const res = request(
    'PUT',
        `${url}:${port}/user/profile/setemail/v1`,
        {
          json: {
            token: token,
            email: email,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type userProfileSetHandleV1Fn = (token: string, handleStr: string) => {} | Iter2Error;

export const userProfileSetHandleV1: userProfileSetHandleV1Fn = (token: string, handleStr: string) => {
  const res = request(
    'PUT',
        `${url}:${port}/user/profile/sethandle/v1`,
        {
          json: {
            token: token,
            handleStr: handleStr,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type channelsCreateV1Fn = (token: string, name: string, isPublic: boolean) => { channelId: number } | Iter2Error;

export const channelsCreateV1: channelsCreateV1Fn = (token: string, name: string, isPublic: boolean) => {
  const res = request(
    'POST',
        `${url}:${port}/channels/create/v2`,
        {
          json: {
            token: token,
            name: name,
            isPublic: isPublic,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type channelsListV1Fn = (token: string) => Array<channels> | Iter2Error;

export const channelsListV1: channelsListV1Fn = (token: string) => {
  const res = request(
    'GET',
        `${url}:${port}/channels/list/v2`,
        {
          qs: {
            token: token,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type channelsListallV1Fn = (token: string) => {channelId: number, name: string} | Iter2Error;

export const channelsListallV1: channelsListallV1Fn = (token: string) => {
  const res = request(
    'GET',
        `${url}:${port}/channels/listall/v2`,
        {
          qs: {
            token: token,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type channelDetailsV1Fn = (token: string, channelId: number) => channeldetails | Iter2Error;

export const channelDetailsV1: channelDetailsV1Fn = (token: string, channelId: number) => {
  const res = request(
    'GET',
        `${url}:${port}/channel/details/v2`,
        {
          qs: {
            token: token,
            channelId: channelId,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type channelJoinV1Fn = (token: string, channelId: number) => {} | Iter2Error;

export const channelJoinV1: channelJoinV1Fn = (token: string, channelId: number) => {
  const res = request(
    'POST',
        `${url}:${port}/channel/join/v2`,
        {
          json: {
            token: token,
            channelId: channelId,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type channelInviteV1Fn = (token: string, channelId: number, uId: number) => {} | Iter2Error;

export const channelInviteV1: channelInviteV1Fn = (token: string, channelId: number, uId: number) => {
  const res = request(
    'POST',
        `${url}:${port}/channel/invite/v2`,
        {
          json: {
            token: token,
            channelId: channelId,
            uId: uId,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type channelMessagesV1Fn = (token: string, channelId: number, start: number) => returnMessages | Iter2Error;

export const channelMessagesV1: channelMessagesV1Fn = (token: string, channelId: number, start: number) => {
  const res = request(
    'GET',
        `${url}:${port}/channel/messages/v2`,
        {
          qs: {
            token: token,
            channelId: channelId,
            start: start,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type channelLeaveV1Fn = (token: string, channelId: number) => {} | Iter2Error;

export const channelLeaveV1: channelLeaveV1Fn = (token: string, channelId: number) => {
  const res = request(
    'POST',
        `${url}:${port}/channel/leave/v1`,
        {
          json: {
            token: token,
            channelId: channelId,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type channelAddOwnerV1Fn = (token: string, channelId: number, uId: number) => {} | Iter2Error;

export const channelAddOwnerV1: channelAddOwnerV1Fn = (token: string, channelId: number, uId: number) => {
  const res = request(
    'POST',
        `${url}:${port}/channel/addowner/v1`,
        {
          json: {
            token: token,
            channelId: channelId,
            uId: uId,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type channelRemoveOwnerV1Fn = (token: string, channelId: number, uId: number) => {} | Iter2Error;

export const channelRemoveOwnerV1: channelRemoveOwnerV1Fn = (token: string, channelId: number, uId: number) => {
  const res = request(
    'POST',
        `${url}:${port}/channel/removeowner/v1`,
        {
          json: {
            token: token,
            channelId: channelId,
            uId: uId,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type messageSendV1Fn = (token: string, channelId: number, message: string) => messageId | Iter2Error;

export const messageSendV1: messageSendV1Fn = (token: string, channelId: number, message: string) => {
  const res = request(
    'POST',
        `${url}:${port}/message/send/v1`,
        {
          json: {
            token: token,
            channelId: channelId,
            message: message,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type messageEditV1Fn = (token: string, messageId: number, message: string) => {} | Iter2Error;

export const messageEditV1: messageEditV1Fn = (token: string, messageId: number, message: string) => {
  const res = request(
    'PUT',
        `${url}:${port}/message/edit/v1`,
        {
          json: {
            token: token,
            messageId: messageId,
            message: message,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type messageRemoveV1Fn = (token: string, messageId: number) => {} | Iter2Error;

export const messageRemoveV1: messageRemoveV1Fn = (token: string, messageId: number) => {
  const res = request(
    'DELETE',
        `${url}:${port}/message/remove/v1`,
        {
          qs: {
            token: token,
            messageId: messageId,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type messageSendDmV1Fn = (token: string, dmId: number, message: string) => messageId | Iter2Error;

export const messageSendDmV1: messageSendDmV1Fn = (token: string, dmId: number, message: string) => {
  const res = request(
    'POST',
        `${url}:${port}/message/senddm/v1`,
        {
          json: {
            token: token,
            dmId: dmId,
            message: message,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type usersListAllV1Fn = (token: string) => {users: userProfile[]} | Iter2Error;

export const usersListAllV1: usersListAllV1Fn = (token: string) => {
  const res = request(
    'GET',
        `${url}:${port}/users/all/v1`,
        {
          qs: {
            token: token,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type dmCreateV1Fn = (token: string, uIds: number[]) => {dmId: number} | {error: 'error'};

export const dmCreateV1: dmCreateV1Fn = (token: string, uIds: number[]) => {
  const res = request(
    'POST',
        `${url}:${port}/dm/create/v1`,
        {
          json: {
            token: token,
            uIds: uIds,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type dmListV1Fn = (token: string) => {dms: dmDetails[]} | Iter2Error;

export const dmListV1: dmListV1Fn = (token: string) => {
  const res = request(
    'GET',
        `${url}:${port}/dm/list/v1`,
        {
          qs: {
            token: token,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type dmRemoveV1Fn = (token: string, dmId: number) => {} | Iter2Error;

export const dmRemoveV1: dmRemoveV1Fn = (token: string, dmId: number) => {
  const res = request(
    'DELETE',
    `${url}:${port}/dm/remove/v1`,
    {
      qs: {
        token: token,
        dmId: dmId
      }
    }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type dmLeaveV1Fn = (token: string, dmId: number) => {} | Iter2Error;

export const dmLeaveV1: dmLeaveV1Fn = (token: string, dmId: number) => {
  const res = request(
    'POST',
        `${url}:${port}/dm/leave/v1`,
        {
          json: {
            token: token,
            dmId: dmId,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type dmDetailsV1Fn = (token: string, dmId: number) => {name: string, members: number[]} | Iter2Error;

export const dmDetailsV1: dmDetailsV1Fn = (token: string, dmId: number) => {
  const res = request(
    'GET',
        `${url}:${port}/dm/details/v1`,
        {
          qs: {
            token: token,
            dmId: dmId,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};

export type dmMessagesV1Fn = (token: string, dmId: number, start: number) => Iter2Error | returnMessages;

export const dmMessagesV1: dmMessagesV1Fn = (token: string, dmId: number, start: number) => {
  const res = request(
    'GET',
        `${url}:${port}/dm/messages/v1`,
        {
          qs: {
            token: token,
            dmId: dmId,
            start: start,
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};
