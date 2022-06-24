1. channelsListallV1 and channelDetailsV1 were implemented under the assumption
that authRegisterV1 and channelCreateV1 created valid Ids. This is a valid assumption
as there would be no point to this function without these two functions that already
do the verification check making another verification in channelsListallV1 and channelDetailsV1
redundant.

2. An assumption made for when registering users is that different users can have a same
password. We made this assumption as passwords are only known by the system and the user,
it is confidental so if it gives an error message something like "password already in use",
this is bad for the security of users' accounts.

3. People can have names including characters, numbers and letters. One example in our
test is the user named "Zero 0". We made this assumption to not discriminate against 
people with names consisting of numbers, letters and characters. For example, Elon Musk's
son X Æ A-12. If an user had a name like this, they would not be able to use their "real"
name.

4. In channelsCreateV1, we made the assumption that "ispublic" input will not always be in 
the correct format/datatype for "ispublic" which is a boolean that consists of either true or false.
Thus, we implemented code to check whether "ispublic" is in correct format/datatype. If not,
an error statement is returned. e.g. the input for "ispublic" is no or yes. this will return
an error statement.

5. clearV1 were implemented so that it clears inside the users and channels array, not
the data object itself. This meant that clear wouldn't delete the users and channels keys
in data object. This assumption was made as if clear deleted the keys, everytime a user
or channel is created, we would need to create the keys users and channels to input
data about the user or channel. This would be not very good code.
