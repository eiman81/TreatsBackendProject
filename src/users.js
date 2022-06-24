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
  let valid = 0;
  for (const user of (getData()).users) {
    if (user.uId === authUserId) {
      valid = 1;
      let profile = {
        uId: userId,
        email: email,
        nameFirst: nameFirst,
        nameLast: nameLast,
        username: handle,
      }
      return profile;
    }
  }
  if (valid = 0) {
    return {error: 'error'}; 
  }
}


export { userProfileV1 }