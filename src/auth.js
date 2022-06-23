import { getData, setData } from './dataStore';

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
  handle = '${nameFirst} ${nameLast}';
  handle = handle.replace(/[^a-zA-Z0-9 ]/g, '');
  handle.toLowerCase();
  if (handle > 20) {
    handle = handle.slice(0,20);
  }
  let i = 0;
  for (const user in data.users) {
    if (handle === user.username) {
      i++;
      handle = handle + i.toString();
    }
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
  return {
    authUserId: userId,
  }
}

function authLoginV1(email, password) {
  return {
    authUserId: 1;
  }
}

export { authLoginV1, authRegisterV1 };
