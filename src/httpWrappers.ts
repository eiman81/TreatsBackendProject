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
        `${url}:${port}/auth/register/v3`,
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
        `${url}:${port}/auth/login/v3`,
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
        `${url}:${port}/auth/logout/v2`,
        {
          headers: {
            token: token
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
        `${url}:${port}/user/profile/v3`,
        {
          qs: {
            uId: uId,
          },
          headers: {
            token: token
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
        `${url}:${port}/user/profile/setname/v2`,
        {
          json: {
            nameFirst: nameFirst,
            nameLast: nameLast,
          },
          headers: {
            token: token
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
        `${url}:${port}/user/profile/setemail/v2`,
        {
          json: {
            email: email,
          },
          headers: {
            token: token
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
        `${url}:${port}/user/profile/sethandle/v2`,
        {
          json: {
            handleStr: handleStr,
          },
          headers: {
            token: token
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
        `${url}:${port}/channels/create/v3`,
        {
          json: {
            name: name,
            isPublic: isPublic,
          },
          headers: {
            token: token
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
        `${url}:${port}/channels/list/v3`,
        {
          headers: {
            token: token
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
        `${url}:${port}/channels/listall/v3`,
        {
          headers: {
            token: token
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
        `${url}:${port}/channel/details/v3`,
        {
          qs: {
            channelId: channelId,
          },
          headers: {
            token: token
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
        `${url}:${port}/channel/join/v3`,
        {
          json: {
            channelId: channelId,
          },
          headers: {
            token: token
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
        `${url}:${port}/channel/invite/v3`,
        {
          json: {
            channelId: channelId,
            uId: uId,
          },
          headers: {
            token: token
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
        `${url}:${port}/channel/messages/v3`,
        {
          qs: {
            channelId: channelId,
            start: start,
          },
          headers: {
            token: token
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
        `${url}:${port}/channel/leave/v2`,
        {
          json: {
            channelId: channelId,
          },
          headers: {
            token: token
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
        `${url}:${port}/channel/addowner/v2`,
        {
          json: {
            channelId: channelId,
            uId: uId,
          },
          headers: {
            token: token
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
        `${url}:${port}/channel/removeowner/v2`,
        {
          json: {
            channelId: channelId,
            uId: uId,
          },
          headers: {
            token: token
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
        `${url}:${port}/message/send/v2`,
        {
          json: {
            channelId: channelId,
            message: message,
          },
          headers: {
            token: token
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
        `${url}:${port}/message/edit/v2`,
        {
          json: {
            messageId: messageId,
            message: message,
          },
          headers: {
            token: token
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
        `${url}:${port}/message/remove/v2`,
        {
          qs: {
            messageId: messageId,
          },
          headers: {
            token: token
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
        `${url}:${port}/message/senddm/v2`,
        {
          json: {
            dmId: dmId,
            message: message,
          },
          headers: {
            token: token
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
        `${url}:${port}/users/all/v2`,
        {
          headers: {
            token: token
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
        `${url}:${port}/dm/create/v2`,
        {
          json: {
            uIds: uIds,
          },
          headers: {
            token: token
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
        `${url}:${port}/dm/list/v2`,
        {
          headers: {
            token: token
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
    `${url}:${port}/dm/remove/v2`,
    {
      qs: {
        dmId: dmId
      },
      headers: {
        token: token
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
        `${url}:${port}/dm/leave/v2`,
        {
          json: {
            dmId: dmId,
          },
          headers: {
            token: token
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
        `${url}:${port}/dm/details/v2`,
        {
          qs: {
            dmId: dmId,
          },
          headers: {
            token: token
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
        `${url}:${port}/dm/messages/v2`,
        {
          qs: {
            dmId: dmId,
            start: start,
          },
          headers: {
            token: token
          }
        }
  );

  if (res.statusCode !== 200) {
    throw res.statusCode;
  } else {
    return JSON.parse(res.body as string);
  }
};
