import { setData} from "./dataStore";

function clearV1() {
  let nodata = {
    users: [],
    channels: [],
  };
  setData(nodata);
}

export { clearV1 }; 
