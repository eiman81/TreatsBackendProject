import {getData, setData} from "./dataStore";

function clearV1() {
  let nodata = {};
  setData(nodata);
  return getData();
}

export { clearV1 };
