import { getData, setData } from './dataStore.js';

function authRegisterV1(email, password, nameFirst, nameLast) {
  const data = getData();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
    return { error: 'error' };
  } else if (password.length < 6) {
    return { error: 'error' };
  } else if (nameFirst.length > 50 || nameFirst.length < 1 || nameLast.length > 50 || nameLast.length < 1) {
    return { error: 'error' };
  } else if (data.users !== null) {
    for (let i = 0; i < data.users.length; i++) {
      if (email === data.users[i].email) {
        return { error: 'error' };
      }
    }
  }
  let handle = '';
  handle = nameFirst + nameLast;
  handle = handle.toLowerCase();
  handle = handle.replace(/[^a-zA-Z0-9 ]/g, '');  
  handle = handle.slice(0,20);
  let count = 0;
  for (let i = 0; i < data.users.length; i++) {
    if (handle === data.users[i].username.slice(0, handle.length)) {
      count++;
    }
  }
  if (count > 0) {
    handle = handle + (count - 1).toString();
  }
  let lowest = -995;
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].uId <= lowest) {
      lowest = data.users[i].uId;
    }
  }
  const userId = lowest - 5;
  data.users.push({
    uId: userId,
    nameFirst: nameFirst,
    nameLast: nameLast,
    email: email,
    password: password,
    username: handle,
    userRole: null,
    isOnline: null,
  });
  setData(data);
  return { authUserId: userId };
}

function authLoginV1(email, password) {
  const data = getData();
  let validEmail = false;
  let found = 0;
  for (let i = 0; i < data.users.length; i++) {
    if (email === data.users[i].email) {
      found = i;
      validEmail = true;
    }
  }
  if (validEmail === false) {
    return { error: 'error' };
  } else {
    if (password != data.users[found].password) {
      return { error: 'error' };
    } else {
      return { authUserId: data.users[found].uId };
    }
  }
}
export { authLoginV1, authRegisterV1 };
