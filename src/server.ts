import express from 'express';
import { echo } from './echo';
import morgan from 'morgan';
import config from './config.json';
import cors from 'cors';
import { authRegisterV1, authLoginV1, authUserId } from './auth';
import { channelsCreateV1, channelsListV1, channelsListallV1 } from './channels';
import { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1 } from './channel';
import { userProfileV1 } from './users';
import { clearV1, findUser } from './other';
import { user } from './dataStore';

// Set up web app, use JSON
const app = express();
app.use(express.json());
// Use middleware that allows for access from other domains
app.use(cors());

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

app.post('auth/register/v2', (req, res) => {
  const { email, password, nameFirst, nameLast } = req.body;
  const authUserId = authRegisterV1(email, password, nameFirst, nameLast) as authUserId;
  const user = findUser(authUserId.authUserId) as user;
  res.json({
    token: user.token,
    authUserId: authUserId,
  });
});

app.post('auth/login/v2', (req, res) => {
  const { email, password } = req.body;
  const authUserId = authLoginV1(email, password) as authUserId;
  const user = findUser(authUserId.authUserId) as user;
  res.json({
    token: user.token,
    authUserId: authUserId,
  });
});

app.post('channels/create/v2', (req, res) => {
  const { token, name, isPublic } = req.body;
  const channelId = channelsCreateV1(token, name, isPublic);
  res.json(channelId);
});

app.get('channels/list/v2', (req, res) => {
  const token = req.query.token.toString();
  const user = findUser(token) as user;
  const channels = channelsListV1(user.uId)
  res.json(channels);
});

app.get('channels/listall/v2', (req, res) => {
  const token = req.query.token.toString();
  const user = findUser(token) as user;
  const channels = channelsListallV1(user.uId)
  res.json({
    channels,
  });
});

app.get('channel/details/v2', (req, res) => {
  const channelId = Number(req.query.channelId.toString());
  const token = req.query.token.toString();
  const user = findUser(token) as user;
  const details = channelDetailsV1(user.uId, channelId);
  res.json(details);
});

app.post('channel/join/v2', (req, res) => {
  const { token, channelId } = req.body;
  const user = findUser(token) as user;
  const channelJoin = channelJoinV1(user.uId, channelId);
  res.json(channelJoin);
});

app.post('channel/invite/v2', (req, res) => {
  let { token, channelId, uId } = req.body;
  const user = findUser(token) as user;
  channelId = Number(channelId);
  uId = Number(uId)
  const invitation = channelInviteV1(user.uId, channelId, uId);
  res.json(invitation);
});

app.get('channel/messages/v2', (req, res) => {
  const token = req.query.token.toString();
  const channelId = Number(req.query.channelId);
  const start = Number(req.query.start)
  const user = findUser(token) as user;

  const messages = channelMessagesV1(user.uId, channelId, start);
  res.json(messages);
});

app.get('user/profile/v2', (req, res) => {
  const token = req.query.token.toString();
  const uId = Number(req.query.uId);
  const user = findUser(token) as user;
  const profile = userProfileV1(user.uId, uId);
  res.json(profile);
});

app.delete('clear/v1', (req, res) => {
  clearV1();
  res.json({});
});

// for logging errors
app.use(morgan('dev'));

// start server
app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server listening on port ${PORT} at ${HOST}`);
});
