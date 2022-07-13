import { updateLanguageServiceSourceFile } from "typescript";

export interface user {
  uId: number,
  nameFirst: string,
  nameLast: string,
  email: string,
  password: string,
  username: string,
  isOnline: boolean
}

export interface channel {
  channelId: number,
  name: string,
  latestMsg: string,
  numberOfMessages: number, 
  messages: string[],
  isPublic: boolean,
  ownerMembers: number[],
  allMembers: number[]
}

export interface data {
  users: Array<user>,
  channels: Array<channel>,
}

// YOU SHOULD MODIFY THIS OBJECT BELOW
let data : data = {
  users: [],
  channels: [],
};

// YOU SHOULDNT NEED TO MODIFY THE FUNCTIONS BELOW IN ITERATION 1

/*
Example usage
    let store = getData()
    console.log(store) # Prints { 'names': ['Hayden', 'Tam', 'Rani', 'Giuliana', 'Rando'] }

    names = store.names

    names.pop()
    names.push('Jake')

    console.log(store) # Prints { 'names': ['Hayden', 'Tam', 'Rani', 'Giuliana', 'Jake'] }
    setData(store)
*/

// Use get() to access the data
function getData(): data {
  return data;
}

// Use set(newData) to pass in the entire data object, with modifications made
function setData(newData: data) {
  data = newData;
}

export { getData, setData };
