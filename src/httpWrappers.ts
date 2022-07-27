import { url, port } from "./config.json";

import request from "sync-request";

export type ClearV1Fn = () => {};

export const clearV1: ClearV1Fn = () => {
  const res = request(
    "DELETE",
    `${url}:${port}/clear/v1`,
  )

  expect(res.statusCode).toBe(200);

  return {};
}

export type authRegisterV1Fn = (email: string, password: string, nameFirst: string, nameLast: string) => { token: string, authUserId: number };

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