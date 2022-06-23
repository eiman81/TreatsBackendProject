import { getData } from "./dataStore";

function userProfileV1(authUserId, uId) {
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