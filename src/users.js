import { getData } from "./dataStore";

function userProfileV1(authUserId, uId) {
  const data = getData();
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].uId === uId) {
      return data.users[i];
    }
  }
  return {error: 'error'}; 
}

export { userProfileV1 }

