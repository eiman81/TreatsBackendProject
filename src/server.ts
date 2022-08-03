import express, { json, Request, Response } from 'express';
import { echo } from './echo';
import morgan from 'morgan';
import config from './config.json';
import cors from 'cors';
import fs from 'fs';
import { authRegisterV1, authLoginV1, authUserId, authLogoutV1 } from './auth';
import { channelsCreateV1, channelsListV1, channelsListallV1 } from './channels';
import { messageSendV1, messageEditV1, messageRemoveV1 } from './channel';
import { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1, channelLeaveV1, channelAddOwnerV1, channelRemoveOwnerV1 } from './channel';
import { userProfileSetNameV1, userProfileV1, usersListAllV1, userProfileSetEmailV1, userProfileSetHandleV1 } from './users';
import { clearV1, findUser, userExists } from './other';
import { user } from './dataStore';
import { dmCreateV1, dmListV1, dmRemoveV1, dmDetailsV1, dmLeaveV1, dmMessagesV1, messageSendDmV1 } from './directMessages';


// Set up web app, use JSON
const app = express();
app.use(express.json());
// Use middleware that allows for access from other domains
app.use(cors());
// for logging errors
app.use(morgan('dev'));

const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || 'localhost';

// Example get request
app.get('/echo', (req, res, next) => {
  try {
    const data = req.query.echo as string;
    return res.json(echo(data));
  } catch (err) {
    next(err);
  }
});

app.post('/auth/register/v2', (req: Request, res: Response) => {
  const { email, password, nameFirst, nameLast } = req.body;
  const User = authRegisterV1(email, password, nameFirst, nameLast) as authUserId;
  res.json(User);
});

app.post('/auth/login/v2', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const User = authLoginV1(email, password) as authUserId;
  res.json(User);
});

app.post('/channels/create/v2', (req: Request, res: Response) => {
  let { token, name, isPublic } = req.body;
  //token = token.toString();
  const channelId = channelsCreateV1(token, name, isPublic);
  res.json(channelId);
});

app.get('/channels/list/v2', (req: Request, res: Response) => {
  const token = req.query.token.toString();
  const channels = channelsListV1(token);
  res.json(channels);
});

app.get('/channels/listall/v2', (req: Request, res: Response) => {
  const token = req.query.token.toString();
  const channels = channelsListallV1(token);
  res.json(channels);
});

app.get('/channel/details/v2', (req: Request, res: Response) => {
  const token = req.query.token.toString();
  const channelId = Number(req.query.channelId.toString());
  const details = channelDetailsV1(token, channelId);
  res.json(details);
});

app.post('/channel/join/v2', (req: Request, res: Response) => {
  let { token, channelId } = req.body;
  token = token.toString();
  const channelJoin = channelJoinV1(token, channelId);
  res.json(channelJoin);
});

app.post('/channel/invite/v2', (req: Request, res: Response) => {
  let { token, channelId, uId } = req.body;
  channelId = Number(channelId);
  uId = Number(uId);
  token = token.toString();
  const invitation = channelInviteV1(token, channelId, uId);
  res.json(invitation);
});

app.get('/channel/messages/v2', (req: Request, res: Response) => {
  const token = req.query.token.toString();
  const channelId = Number(req.query.channelId);
  const start = Number(req.query.start);
  const messages = channelMessagesV1(token, channelId, start);
  res.json(messages);
});

app.get('/user/profile/v2', (req: Request, res: Response) => {
  const token = req.query.token.toString();
  const uId = Number(req.query.uId);
  const user = findUser(token) as user;
  const profile = userProfileV1(token, uId);
  res.json(profile);
});

app.delete('/clear/v1', (req: Request, res: Response) => {
  clearV1();
  res.json({});
});

app.post('/auth/logout/v1', (req: Request, res: Response) => {
  let { token } = req.body;
  token = token.toString();
  res.json(authLogoutV1(token));
});

app.post('/channel/leave/v1', (req: Request, res: Response) => {
  let { token, channelId } = req.body;
  token = token.toString();
  const channelLeave = channelLeaveV1(token, channelId);
  res.json(channelLeave);
});

app.post('/channel/addowner/v1', (req: Request, res: Response) => {
  let { token, channelId, uId } = req.body;
  token = token.toString();
  const channelAddOwner = channelAddOwnerV1(token, channelId, uId);
  res.json(channelAddOwner);
});

app.post('/channel/removeowner/v1', (req: Request, res: Response) => {
  let { token, channelId, uId } = req.body;
  token = token.toString();
  const channelRemoveOwner = channelRemoveOwnerV1(token, channelId, uId);
  res.json(channelRemoveOwner);
});

// for logging errors
app.use(morgan('dev'));

app.post('/message/send/v1', (req: Request, res: Response) => {
  let { token, channelId, message } = req.body;
  token = token.toString();
  channelId = Number(channelId);
  message = message.toString();
  const messageId = messageSendV1(token, channelId, message);
  res.json(messageId);
});

app.put('/message/edit/v1', (req: Request, res: Response) => {
  let { token, messageId, message } = req.body;
  token = token.toString();
  messageId = Number(messageId);
  res.json(messageEditV1(token, messageId, message));
});

app.delete('/message/remove/v1', (req: Request, res: Response) => {
  const token = req.query.token.toString();
  const messageId = Number(req.query.messageId);
  res.json(messageRemoveV1(token, messageId));
});

app.post('/dm/create/v1', (req: Request, res: Response) => {
  let { token, uIds } = req.body;
  token = token.toString();
  res.json(dmCreateV1(token, uIds));
});

app.get('/dm/list/v1', (req: Request, res: Response) => {
  const token = req.query.token.toString();
  const dms = dmListV1(token);
  res.json(dms);
});

app.delete('/dm/remove/v1', (req: Request, res: Response) => {
  const token = req.query.token.toString();
  const dmId = Number(req.query.dmId);
  res.json(dmRemoveV1(token, dmId));
});

app.get('/dm/details/v1', (req: Request, res: Response) => {
  const token = req.query.token.toString();
  const dmId = Number(req.query.dmId);
  res.json(dmDetailsV1(token, dmId));
});

app.post('/dm/leave/v1', (req: Request, res: Response) => {
  let { token, dmId } = req.body;
  token = token.toString();
  res.json(dmLeaveV1(token, dmId));
});

app.get('/dm/messages/v1', (req: Request, res: Response) => {
  const token = req.query.token.toString();
  const dmId = Number(req.query.dmId);
  const start = Number(req.query.start);
  res.json(dmMessagesV1(token, dmId, start));
});

app.post('/message/senddm/v1', (req: Request, res: Response) => {
  let { token, dmId, message } = req.body;
  token = token.toString();
  dmId = Number(dmId);
  message = message.toString();
  res.json(messageSendDmV1(token, dmId, message));
});

app.get('/users/all/v1', (req: Request, res: Response) => {
  const token = req.query.token.toString();
  res.json(usersListAllV1(token));
});

app.put('/user/profile/setname/v1', (req: Request, res: Response) => {
  let { token, nameFirst, nameLast } = req.body;
  token = token.toString();
  res.json(userProfileSetNameV1(token, nameFirst, nameLast));
});

app.put('/user/profile/setemail/v1', (req: Request, res: Response) => {
  let { token, email } = req.body;
  token = token.toString();
  res.json(userProfileSetEmailV1(token, email));
});

app.put('/user/profile/sethandle/v1', (req: Request, res: Response) => {
  let { token, handleStr } = req.body;
  token = token.toString();
  res.json(userProfileSetHandleV1(token, handleStr));
});

// start server
const server = app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server listening on port ${PORT} at ${HOST}`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  server.close(() => console.log('Shutting down server gracefully.'));
});
