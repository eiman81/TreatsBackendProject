import { getData, user } from "./dataStore";

function userProfileV1(authUserId: number, uId: number) : user | {error: 'error'} {
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
    if (authUserId === user.uId) {
      for (const user of data.users) {
        if (uId === user.uId) {
          return user;
        }
      }
    }
  }

  return {error: 'error'}; 
}

export { userProfileV1 }
