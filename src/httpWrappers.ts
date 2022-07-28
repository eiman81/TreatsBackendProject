import { url, port } from "./config.json";

import request from "sync-request";
import { token } from "morgan";

export type Iter2Error = {error: "error"};

export type ClearV1Fn = () => {};

export const clearV1: ClearV1Fn = () => {
  const res = request(
    "DELETE",
    `${url}:${port}/clear/v1`,
  )

  return {};
}

export type authRegisterV1Fn = (email: string, password: string, nameFirst: string, nameLast: string) => { token: string, authUserId: number } | Iter2Error;

export const authRegisterV1: authRegisterV1Fn = (email: string, password: string, nameFirst: string, nameLast: string) => {
    const res = request(
        "POST",
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
}

export type authLoginV1Fn = (email: string, password: string) => { token: string, authUserId: number } | Iter2Error;

export const authLoginV1: authLoginV1Fn = (email: string, password: string) => {
    const res = request(
        "POST",
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
}

export type authLogoutV1Fn = (token: string) => {} | Iter2Error;

export const authLogoutV1: authLogoutV1Fn = (token: string) => {
    const res = request(
        "POST",
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
}

export type userProfileV1Fn = (token: string, uId: number) => {uId: number, nameFirst: string, nameLast: string, email: string, handleStr: string} | Iter2Error;

export const userProfileV1: userProfileV1Fn = (token: string, uId: number) => {
    const res = request(
        "GET",
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
}


export type channelsCreateV1Fn = (token: string, name: string, isPublic: boolean) => { channelId: number } | Iter2Error;

export const channelsCreateV1: channelsCreateV1Fn = (token: string, name: string, isPublic: boolean) => {
    const res = request(
        "POST",
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
}