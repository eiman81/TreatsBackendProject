import { token } from 'morgan';
import { getData, setData, tokenGenerate, setTokens, getTokens, user } from './dataStore';
import {findUser} from './other'

export interface authUserId {
  token: string,
  authUserId: number
}

function authRegisterV1(email: string, password: string, nameFirst: string, nameLast: string): authUserId | {error: 'error'} {
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
  handle = nameFirst + nameLast;
  handle = handle.toLowerCase();
  handle = handle.replace(/[^a-zA-Z0-9 ]/g, '');
  handle = handle.slice(0, 20);
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
  const token = tokenGenerate();
  data.users.push({
    uId: userId,
    nameFirst: nameFirst,
    nameLast: nameLast,
    email: email,
    password: password,
    username: handle,
    isOnline: null,
    token: token
  });
  setData(data);
  return {
    token: token,
    authUserId: userId,
  };
}

function authLoginV1(email: string, password: string): authUserId | {error: 'error'} {
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
    if (password !== data.users[found].password) {
      return { error: 'error' };
    } else {
      data.users[found].token = tokenGenerate();
      return {
        token: data.users[found].token,
        authUserId: data.users[found].uId
      };
    }
  }
}


function authLogoutV1(token: string): {} | {error: 'error'} {
/*
< Given a current token, logs out the corresponding user and destroys token >

Arguments:
    <token> <string>

Exceptions:
Error   -Occurs when
1. token is not valid

Return Value:
    {} on success
*/
    let user = findUser(token);
    if (user === {error: 'error'}) {
      return {error: 'error'}
    } else {
      user = findUser(token) as user;
      let counter = 0;
      for (const person of getData().users) {
        if (user.uId === person.uId) {
          person.token = '';
          let newData = getData();
          newData.users[counter] = person;
          setData(newData);
          break;
        }
        counter++;
      }
      let index = 0;
      for (const tok of getTokens()) {
        if (tok == token) {
          let newTokens = getTokens();
          newTokens.splice(index, 1);
          setTokens(newTokens);
          return {};
        }
        index++;
      }
    }
}

export { authLoginV1, authRegisterV1, authLogoutV1 };
