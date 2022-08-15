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
import errorHandler from 'middleware-http-errors';

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

app.post('/auth/register/v3', (req: Request, res: Response) => {
  const { email, password, nameFirst, nameLast } = req.body;
  const User = authRegisterV1(email, password, nameFirst, nameLast) as authUserId;
  res.json(User);
});

app.post('/auth/login/v3', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const User = authLoginV1(email, password) as authUserId;
  res.json(User);
});

app.post('/channels/create/v3', (req: Request, res: Response) => {
  const { name, isPublic } = req.body;
  const token = req.headers.token.toString();
  const channelId = channelsCreateV1(token, name, isPublic);
  res.json(channelId);
});

app.get('/channels/list/v3', (req: Request, res: Response) => {
  const token = req.headers.token.toString();
  const channels = channelsListV1(token);
  res.json(channels);
});

app.get('/channels/listall/v3', (req: Request, res: Response) => {
  const token = req.headers.token.toString();
  const channels = channelsListallV1(token);
  res.json(channels);
});

app.get('/channel/details/v3', (req: Request, res: Response) => {
  const token = req.headers.token.toString();
  const channelId = Number(req.query.channelId.toString());
  const details = channelDetailsV1(token, channelId);
  res.json(details);
});

app.post('/channel/join/v3', (req: Request, res: Response) => {
  const { channelId } = req.body;
  const token = req.headers.token.toString();
  const channelJoin = channelJoinV1(token, channelId);
  res.json(channelJoin);
});

app.post('/channel/invite/v3', (req: Request, res: Response) => {
  let { channelId, uId } = req.body;
  channelId = Number(channelId);
  uId = Number(uId);
  const token = req.headers.token.toString();
  const invitation = channelInviteV1(token, channelId, uId);
  res.json(invitation);
});

app.get('/channel/messages/v3', (req: Request, res: Response) => {
  const token = req.headers.token.toString();
  const channelId = Number(req.query.channelId);
  const start = Number(req.query.start);
  const messages = channelMessagesV1(token, channelId, start);
  res.json(messages);
});

app.get('/user/profile/v3', (req: Request, res: Response) => {
  const token = req.headers.token.toString();
  const uId = Number(req.query.uId);
  const user = findUser(token) as user;
  const profile = userProfileV1(token, uId);
  res.json(profile);
});

app.delete('/clear/v1', (req: Request, res: Response) => {
  clearV1();
  res.json({});
});

app.post('/auth/logout/v2', (req: Request, res: Response) => {
  const token = req.headers.token.toString();
  res.json(authLogoutV1(token));
});

app.post('/channel/leave/v2', (req: Request, res: Response) => {
  const { channelId } = req.body;
  const token = req.headers.token.toString();
  const channelLeave = channelLeaveV1(token, channelId);
  res.json(channelLeave);
});

app.post('/channel/addowner/v2', (req: Request, res: Response) => {
  const { channelId, uId } = req.body;
  const token = req.headers.token.toString();
  res.json(channelAddOwnerV1(token, channelId, uId));
});

app.post('/channel/removeowner/v2', (req: Request, res: Response) => {
  let { channelId, uId } = req.body;
  const token = req.headers.token.toString();
  channelId = Number(channelId);
  uId = Number(uId);
  const channelRemoveOwner = channelRemoveOwnerV1(token, channelId, uId);
  res.json(channelRemoveOwner);
});

// for logging errors
app.use(morgan('dev'));

// for logging errors
app.use(morgan('dev'));

app.post('/message/send/v2', (req: Request, res: Response) => {
  let { channelId, message } = req.body;
  const token = req.headers.token.toString();
  channelId = Number(channelId);
  message = message.toString();
  const messageId = messageSendV1(token, channelId, message);
  res.json(messageId);
});

app.put('/message/edit/v2', (req: Request, res: Response) => {
  let { messageId, message } = req.body;
  const token = req.headers.token.toString();
  messageId = Number(messageId);
  res.json(messageEditV1(token, messageId, message));
});

app.delete('/message/remove/v2', (req: Request, res: Response) => {
  const token = req.headers.token.toString();
  const messageId = Number(req.query.messageId);
  res.json(messageRemoveV1(token, messageId));
});

app.post('/dm/create/v2', (req: Request, res: Response) => {
  const { uIds } = req.body;
  const token = req.headers.token.toString();
  res.json(dmCreateV1(token, uIds));
});

app.get('/dm/list/v2', (req: Request, res: Response) => {
  const token = req.headers.token.toString();
  const dms = dmListV1(token);
  res.json(dms);
});

app.delete('/dm/remove/v2', (req: Request, res: Response) => {
  const token = req.headers.token.toString();
  const dmId = Number(req.query.dmId);
  res.json(dmRemoveV1(token, dmId));
});

app.get('/dm/details/v2', (req: Request, res: Response) => {
  const token = req.headers.token.toString();
  const dmId = Number(req.query.dmId);
  res.json(dmDetailsV1(token, dmId));
});

app.post('/dm/leave/v2', (req: Request, res: Response) => {
  const { dmId } = req.body;
  const token = req.headers.token.toString();
  res.json(dmLeaveV1(token, dmId));
});

app.get('/dm/messages/v2', (req: Request, res: Response) => {
  const token = req.headers.token.toString();
  const dmId = Number(req.query.dmId);
  const start = Number(req.query.start);
  res.json(dmMessagesV1(token, dmId, start));
});

app.post('/message/senddm/v2', (req: Request, res: Response) => {
  let { dmId, message } = req.body;
  const token = req.headers.token.toString();
  dmId = Number(dmId);
  message = message.toString();
  res.json(messageSendDmV1(token, dmId, message));
});

app.get('/users/all/v2', (req: Request, res: Response) => {
  const token = req.headers.token.toString();
  res.json(usersListAllV1(token));
});

app.put('/user/profile/setname/v2', (req: Request, res: Response) => {
  const { nameFirst, nameLast } = req.body;
  const token = req.headers.token.toString();
  res.json(userProfileSetNameV1(token, nameFirst, nameLast));
});

app.put('/user/profile/setemail/v2', (req: Request, res: Response) => {
  const { email } = req.body;
  const token = req.headers.token.toString();
  res.json(userProfileSetEmailV1(token, email));
});

app.put('/user/profile/sethandle/v2', (req: Request, res: Response) => {
  const { handleStr } = req.body;
  const token = req.headers.token.toString();
  res.json(userProfileSetHandleV1(token, handleStr));
});

// handles errors nicely
app.use(errorHandler());

// start server
const server = app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server listening on port ${PORT} at ${HOST}`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  server.close(() => console.log('Shutting down server gracefully.'));
});
