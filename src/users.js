import { getData } from "./dataStore.js";

function userProfileV1(authUserId, uId) {
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
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].uId === uId) {
      return data.users[i];
    }
  }
  return {error: 'error'}; 
}

export { userProfileV1 }

