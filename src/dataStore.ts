import { updateLanguageServiceSourceFile } from 'typescript';
import fs from 'fs';

export interface messages {
  messageId: number,
  uId: number,
  message: string,
  timeSent: number
}

export interface user {
  uId: number,
  nameFirst: string,
  nameLast: string,
  email: string,
  password: string,
  handleStr: string,
  isOnline: boolean,
  token: string
}

export interface channel {
  channelId: number,
  name: string,
  numberOfMessages: number,
  messages: messages[],
  isPublic: boolean,
  dm: boolean,
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
  data = JSON.parse(String(fs.readFileSync('./src/data.json', { flag: 'r' })));
  return data;
}

// Use set(newData) to pass in the entire data object, with modifications made
function setData(newData: data) {
  data = newData;
  fs.writeFileSync('./src/data.json', JSON.stringify(data));
}

let currentTokens: string[] = [];
// Create token for user session

function getTokens(): string[] {
  return currentTokens;
}

function setTokens(tokens: string[]) {
  currentTokens = tokens;
}

function tokenGenerate(): string {
  const tokenNum = Math.random();
  const newToken = tokenNum.toString();
  const newTokens = getTokens();
  newTokens.push(newToken);
  setTokens(newTokens);
  return newToken;
}

export { getData, setData, tokenGenerate, setTokens, getTokens };
