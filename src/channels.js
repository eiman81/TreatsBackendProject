function channelsCreateV1(authUserId, name, isPublic) {
/*
< Given a authUserId, the channel name and choose whether it is public, creates a new channel with the given name. 
  The user who created it automatically joins the channel >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>
    <name> (<string>)    - <input naem>
    <isPublic> (<bool>)    - <input isPublic>

Exceptions:
Error   -Occurs when
1. length of name is less than 1 or more than 20 characters.

Return Value:
    Returns <channelId> on <all test pass>
*/     
  return {
    channelId: 1,
  };
}

function channelsListV1(authUserId) {
/*
< Given a authUserId, Provide an array of all channels (and their associated details) that the authorised user is part of >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>

Exceptions:
Error   -Occurs when

Return Value:
    Returns <channels> on <all test pass>
*/       
  return {
    channels: [] // see interface for contents
  };
}

function channelsListallV1(authUserId) {
/*
< Given a authUserId, Provide an array of all channels, including private channels, (and their associated details) >

Arguments:
    <authUserId> (<integer>)    - <input authUserId>

Exceptions:
Error   -Occurs when

Return Value:
    Returns <channels> on <all test pass>
*/       
  return {
    channels: [] // see interface for contents
  };
}

export { channelsCreateV1, channelsListV1, channelsListallV1 };
