import {getData, setData} from "./dataStore";

function clearV1() {
  let nodata = {
    users: [],
    channels: [],
  };
  
  setData(nodata);
  return getData();
}

export { clearV1 };
