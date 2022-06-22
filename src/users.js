import { getData } from "./dataStore";

function userProfileV1(authUserId, uId) {
  let store = getData();
  const userdata = store['user'][uId]
  if (userdata === undefined) {
    return {error: 'error'}
  }
  
  return {user: uId, user: email, user: nameFirst, user: nameLast};
}

export { userProfileV1 }