import { getData, setData, user } from './dataStore';
import { findUser, userExists } from './other';
import validator from 'validator';

export interface userProfile {
  uId: number,
  email: string,
  nameFirst: string,
  nameLast: string,
  handleStr: string,
}

function userProfileV1(token: string, uId: number) : userProfile | {error: 'error'} {
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
  token = token.toString();
  const data = getData();
  for (const user of data.users) {
    if (token === user.token) {
      for (const user of data.users) {
        if (uId === user.uId) {
          const userProfile = {
            uId: user.uId,
            email: user.email,
            nameFirst: user.nameFirst,
            nameLast: user.nameLast,
            handleStr: user.handleStr,
          };

          return userProfile;
        }
      }
    }
  }

  return { error: 'error' };
}

/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function usersListAllV1(token: string): {error: 'error'} | {users: userProfile[]} {
  if (userExists(token)) {
    const users = [];
    for (const user of getData().users) {
      const userDetails = {
        uId: user.uId,
        email: user.email,
        nameFirst: user.nameFirst,
        nameLast: user.nameLast,
        handleStr: user.handleStr
      };
      users.push(userDetails);
    }

    return { users };
  } else {
    return { error: 'error' };
  }
}

/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function userProfileSetNameV1(token: string, nameFirst: string, nameLast: string): {error: 'error'} | {} {
  if (userExists(token) && nameFirst.length <= 50 && nameLast.length <= 50) {
    let index = 0;
    const userToEdit = findUser(token) as user;
    for (const user of getData().users) {
      if (user.uId === userToEdit.uId) {
        const data = getData();
        data.users[index].nameFirst = nameFirst;
        data.users[index].nameLast = nameLast;
        setData(data);
      }
      index++;
    }
  } else {
    return { error: 'error' };
  }
}

/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function userProfileSetEmailV1(token: string, email: string): {error: 'error'} | {} {
  if (userExists(token) && validator.isEmail(email)) {
    let alreadyUsed = false;
    for (const user of getData().users) {
      if (user.email === email) {
        alreadyUsed = true;
      }
    }

    if (alreadyUsed === false) {
      let index = 0;
      const userToEdit = findUser(token) as user;
      for (const user of getData().users) {
        if (user.uId === userToEdit.uId) {
          const data = getData();
          data.users[index].email = email;
          setData(data);
        }

        index++;
      }
    } else {
      return { error: 'error' };
    }
  } else {
    return { error: 'error' };
  }
}

/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function userProfileSetHandleV1(token: string, handleStr: string): {error: 'error'} | {} {
  if (userExists(token) && handleStr.length >= 3 && handleStr.length <= 20 && /^[A-Za-z0-9]*$/.test(handleStr)) {
    let alreadyUsed = false;
    for (const user of getData().users) {
      if (user.handleStr === handleStr) {
        alreadyUsed = true;
      }
    }

    if (alreadyUsed === false) {
      let index = 0;
      const userToEdit = findUser(token) as user;
      for (const user of getData().users) {
        if (user.uId === userToEdit.uId) {
          const data = getData();
          data.users[index].handleStr = handleStr;
          setData(data);
        }

        index++;
      }
    } else {
      return { error: 'error' };
    }
  } else {
    return { error: 'error' };
  }
}

export { userProfileV1, usersListAllV1, userProfileSetNameV1, userProfileSetEmailV1, userProfileSetHandleV1 };
