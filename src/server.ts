import express from 'express';
import { echo } from './echo';
import morgan from 'morgan';
import config from './config.json';
import cors from 'cors';
import { authRegisterV1, authLoginV1 } from './auth';
import { channelsCreateV1, channelsListV1, channelsListallV1 } from './channels';
import { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1 } from './channel';
import { userProfileV1 } from './users';
import { clearV1 } from './other';

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
  const { token, authUserId } = authRegisterV1(email, password, nameFirst, nameLast);
  res.json({
    token: token,
    authUserId: authUserId,
  });
});

app.post('auth/login/v2', (req, res) => {
  const { email, password } = req.body;
  const { token, authUserId } = authLoginV1(email, password);
  res.json({
    token: token,
    authUserId: authUserId,
  });
});

app.post('channels/create/v2', (req, res) => {
  const { token, name, isPublic } = req.body;
  const { channelId } = channelsCreateV1(token, name, isPublic);
  res.json({
    channelId: channelId,
  });
});

app.get('channels/list/v2', (req, res) => {
  const token = req.query.token;
  const { channels } = channelsListV1(token);
  res.json({
    channels,
  });
});

app.get('channels/listall/v2', (req, res) => {
  const token = req.query.token;
  const { channels } = channelsListallV1(token);
  res.json({
    channels,
  });
});

app.get('channel/details/v2', (req, res) => {
  const { token, channelId } = req.query;
  const { object } = channelDetailsV1(token, channelId);
  res.json({
    object,
  });
});

app.post('channel/join/v2', (req, res) => {
  const { token, channelId } = req.body;
  const {} = channelJoinV1(token, channelId);
  res.json({});
});

app.post('channel/invite/v2', (req, res) => {
  const { token, channelId, uId } = req.body;
  const {} = channelInviteV1(token, channelId, uId);
  res.json({});
});

app.get('channel/messages/v2', (req, res) => {
  const { token, channelId, start } = req.query;
  const { messages, start, end } = channelMessagesV1(token, channelId, start);
  res.json({
    messages: messages,
    start: start,
    end: end,
  });
});

app.get('user/profile/v2', (req, res) => {
  const { token, uId } = req.query;
  const { user } = userProfileV1(token, uId);
  res.json({
    user,
  });
});

app.delete('clear/v1', (req, res) => {
  clearV1();
  res.json({});
});

// for logging errors
app.use(morgan('dev'));

// start server
app.listen(PORT, HOST, () => {
  console.log(`???? Server listening on port ${PORT} at ${HOST}`);
});
