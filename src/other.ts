import { getData, setData} from "./dataStore";

function clearV1(): data {
/*
< Resets the internal data of the application to its initial state >

Arguments:

Exceptions:

Return Value:
    Returns <{}> on <all test pass>
*/     

  let nodata: data = {
    users: [],
    channels: [],
  };
  setData(nodata);

  return nodata;
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


export { clearV1, channelExists }; 
