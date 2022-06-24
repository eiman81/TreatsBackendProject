import { setData} from "./dataStore.js";

function clearV1() {
  let nodata = {
    users: [],
    channels: [],
  };
  setData(nodata);
}

export { clearV1 }; 
