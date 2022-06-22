import { getData, setData } from './dataStore';

function authRegisterV1(email, password, nameFirst, nameLast) {
  const data = getData();
  let emailFormat = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  let validEmail = (email) => {regex.test(email)};
  if (validEmail === false) {
    return { error: 'error' };
  } else if (password.length < 6) {
    return { error: 'error' };
  } else if (nameFirst.length > 50 || nameFirst.length < 1 || nameLast.length > 50 || nameLast.length < 1) {
    return { error: 'error' };
  } else if (data.users !== null) {
    for (existingEmail in data.users.email) {
      if (email === existingEmail) {
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
  for (const user in data.users) {
    if (user.uId <= lowest) {
      lowest = user.uId;
    }
  }
  data.users.push = {
    uId: lowest - 5,
    nameFirst: nameFirst,
    nameLast: nameLast,
    email: email,
    password: password,
    username: handle,
    userRole: null,
  }
  const userId = lowest - 5;
  setData(data);
  return {
    authUserId: userId,
  }
}

function authLoginV1(email, password) {
  return {
    authUserId: 1,
  }
}

export { authLoginV1, authRegisterV1 };
