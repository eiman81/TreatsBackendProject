import { setData} from "./dataStore";

function clearV1() {
/*
< Resets the internal data of the application to its initial state >

Arguments:

Exceptions:

Return Value:
    Returns <{}> on <all test pass>
*/     

  let nodata = {
    users: [],
    channels: [],
  };
  setData(nodata);
}

export { clearV1 }; 
