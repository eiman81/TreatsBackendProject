import { setData, user, channel, data } from "./dataStore";

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

export { clearV1 }; 
