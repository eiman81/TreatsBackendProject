import { updateLanguageServiceSourceFile } from "typescript";

export interface user {
  uId: number,
  nameFirst: string,
  nameLast: string,
  email: string,
  password: string,
  username: string,
  isOnline: boolean
  token: string
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

// Use get() to access the data
function getData(): data {
  return data;
}

// Use set(newData) to pass in the entire data object, with modifications made
function setData(newData: data) {
  data = newData;
}

let currentTokens = [];
// Create token for user session

function getTokens(): string[] {
  return currentTokens;
}

function setTokens(tokens: string[]) {
  currentTokens = tokens
}

function tokenGenerate() {
  let tokenNum = Math.random();
  let newToken = tokenNum.toString();
  currentTokens.push(newToken);
}

export { getData, setData, tokenGenerate, setTokens, getTokens };
