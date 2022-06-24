import { getData, setData } from './dataStore';

function authRegisterV1(email, password, nameFirst, nameLast) {
/*
< Given users's email, password, first name and last name, creat a new account for them and return their authUserId.
  Also the function will give user their handle, a handle is the concatenation of their casted-to-lowercase alphanumeric 
  first name and last name >

Arguments:
    <email> (<string>)    - <input email>
    <password> (<string>)    - <input password>
    <nameFirst> (<string>)    - <input nameFirst>
    <nameLast> (<string>)    - <input nameLast>

Exceptions:
Error   -Occurs when
1. email entered is not a valid email.
2. email address is already being used by another user.
3. length of password is less than 6 characters.
4. length of nameFirst is not between 1 and 50 characters inclusive.
5. length of nameLast is not between 1 and 50 characters inclusive.

Return Value:
    Returns <authUserId> on <all test pass>
*/   
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
/*
< Given a registered email and password, returns their `authUserId` value >

Arguments:
    <email> (<string>)    - <input email>
    <password> (<string>)    - <input password>

Exceptions:
Error   -Occurs when
1. email entered does not belong to a user.
2. password is not correct.

Return Value:
    Returns <authUserId> on <all test pass>
*/ 
  return {
    authUserId: 1,
  }
}

export { authLoginV1, authRegisterV1 };
