import { getData, user } from './dataStore';

interface userProfile {
  uId: number,
  nameFirst: string,
  nameLast: string,
  email: string,
  username: string,
}

function userProfileV1(token: string, uId: number) : userProfile | {error: 'error'} {
/*
< Given authUserId and uId, if user is valid, returns information about their userId, email, first name, last name, and handle >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>
    <uId> (<integer>)    - <input uId>

Exceptions:
Error   -Occurs when
1. uId does not refer to a valid user.

Return Value:
    Returns <user> on <all test pass>
*/
  const data = getData();
  for (const user of data.users) {
    if (token === user.token) {
      for (const user of data.users) {
        if (uId === user.uId) {
          const userProfile = {
            uId: user.uId,
            nameFirst: user.nameFirst,
            nameLast: user.nameLast,
            email: user.email,
            username: user.username,
          };

          return userProfile;
        }
      }
    }
  }

  return { error: 'error' };
}

export { userProfileV1 };
