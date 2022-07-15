import { authRegisterV1, authLoginV1, authUserId } from './auth';
import { userProfileV1 } from './users';
import { clearV1, findUser } from './other';
import request from 'sync-request';
import config from './config.json';
import { user } from './dataStore';

const OK = 200;
const port = config.port;
const url = config.url;

let token = findUser(-1000) as user;
describe('HTTP tests for authRegister', () => {
    test('Test successful creation of first user', () => {
      const res = request(
        'POST',
              `${url}:${port}/auth/register/v2`,
              {
                body: JSON.stringify({
                    email: 'cristiano.ronaldo@unsw.edu.au',
                    password: '1234567',
                    nameFirst: 'Cristiano',
                    nameLast: 'Ronaldo'
                }),
                headers: {
                    'Content-type': 'application/json',
                }
              }
      );
      const bodyObj = JSON.parse(res.body as string);
      expect(res.statusCode).toBe(OK);
      expect(bodyObj).toEqual({token: token.token, authUserId: -1000});
    });
});
