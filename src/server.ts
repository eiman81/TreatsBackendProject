import express, { json, Request, Response } from 'express';
import { echo } from './echo';
import morgan from 'morgan';
import config from './config.json';
import cors from 'cors';
import { authRegisterV1, authLoginV1, authUserId, authLogoutV1 } from './auth';
import { channelsCreateV1, channelsListV1, channelsListallV1 } from './channels';
import { messageSendV1 } from './channel';
import { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1, channelLeaveV1, channelAddOwnerV1, channelRemoveOwnerV1 } from './channel';
import { userProfileV1 } from './users';
import { clearV1, findUser, userExists } from './other';
import { getData, getTokens, setData, setTokens, user } from './dataStore';

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
  const { token, name, isPublic } = req.body;
  const channelId = channelsCreateV1(token, name, isPublic);
  res.json(channelId);
});

app.get('/channels/list/v2', (req: Request, res: Response) => {
  const token = req.query.token.toString();
  const channels = channelsListV1(token);
  res.json({channels});
});

app.get('/channels/listall/v2', (req: Request, res: Response) => {
  const token = req.query.token.toString();
  const channels = channelsListallV1(token);
  res.json({channels});
});

app.get('/channel/details/v2', (req: Request, res: Response) => {
  const channelId = Number(req.query.channelId.toString());
  const token = req.query.token.toString();
  const details = channelDetailsV1(token, channelId);
  res.json(details);
});

app.post('/channel/join/v2', (req: Request, res: Response) => {
  const { token, channelId } = req.body;
  const channelJoin = channelJoinV1(token, channelId);
  res.json(channelJoin);
});

app.post('/channel/invite/v2', (req: Request, res: Response) => {
  let { token, channelId, uId } = req.body;
  channelId = Number(channelId);
  uId = Number(uId);
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
  const {token} = req.body;
  res.json(authLogoutV1(token));
})

app.post('/message/send/v1', (req: Request, res: Response) => {
  const { token, channelId, message} = req.body;
  const messageId = messageSendV1(token, channelId, message);
  res.json(messageId);
})

app.post('/channel/leave/v1', (req: Request, res: Response) => {
  const { token, channelId } = req.body;
  const channelLeave = channelLeaveV1(token, channelId);
  res.json(channelLeave);
});

app.post('/channel/addowner/v2', (req: Request, res: Response) => {
  const { token, channelId, uId } = req.body;
  const channelAddOwner = channelAddOwnerV1(token, channelId, uId);
  res.json(channelAddOwner);
});

app.post('/channel/removeowner/v2', (req: Request, res: Response) => {
  const { token, channelId, uId } = req.body;
  const channelRemoveOwner = channelRemoveOwnerV1(token, channelId, uId);
  res.json(channelRemoveOwner);
});

// start server
app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server listening on port ${PORT} at ${HOST}`);
});
