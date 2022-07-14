import { NODATA } from "dns";
import { getData, setData, data } from "./dataStore";
interface nodata {};

function clearV1(): nodata {
/*
< Resets the internal data of the application to its initial state >

Arguments:

Exceptions:

Return Value:
    Returns <{}> on <all test pass>
*/     
  let data: data = {
    users: [],
    channels: [],
  };
  let nodata = {};
  setData(data);
  if (getData().users.length === 0 && getData().channels.length === 0) {
    return nodata;
  }
}


function channelExists(channelId: number): boolean {
  let found = 0;
  for (const channel of getData().channels) {
    if (channel.channelId === channelId) {
      found = 1;
      return true;
    }
  }
  if (found === 0) {
    return false;
  }
}

function userExists(authUserId: number): boolean {
  let found = 0;
  for (const user of getData().users) {
    if (user.uId === authUserId) {
      found = 1;
      return true;
    }
  }
  if (found === 0) {
    return false;
  }
}


export { clearV1, channelExists, userExists }; 
