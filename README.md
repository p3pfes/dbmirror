dbmirror
Hello hi.

A Discord bot developed by k7th
(@komeijisatofan on Twitter/X, @the7thone on Discord)
This bot is intended to be used as a Danbooru mirror/feed, to post updates of a user-inputted tag.

Certain tags have been blacklisted by me in order to prevent the bot and/or me from being included
in any legal situation.
These tags can be viewed in the main.js file.

Invite Link
Click here to invite dbmirror:
https://discord.com/oauth2/authorize?client_id=1361779903019749576&permissions=52224&integr
ation_type=0&scope=bot

-- TUTORIAL --
You need Manage Channels permission to use the bot.
Posting a tag:
db!post <#channel> <tag>
Example:
db!post #channel komeiji_satori
There can only be one tag per channel.


Changing the tag in a channel:
Do the same command for the same channel, but with a new tag.
Example:
db!post #channel komeiji_koishi
Bot replies:
Replaced tag (original tag would be here) with komeiji_koishi.

Make sure the tag you add exists and is spelled correctly (Danbooru format).
The bot will automatically block NSFW posts.

Stopping the feed in a channel:
db!stop <#channel>
Example:
db!stop #channel

Toggling NSFW content:
    To allow NSFW posts:
    db!nsfw #channel
    Bot replies:
    NSFW posts are unfiltered.
    Repeat the command to turn the NSFW filter back on.

Bug Reporting / Contact:
    Twitter/X: @komeijisatofan
    Discord: @the7thone
    Legal & Usage Terms

dbmirror is provided "as is" with no warranties.

The developer is not liable for any damages or issues arising from using the bot.
dbmirror is intended for informational purposes only.

You may not use dbmirror to distribute illegal, harmful, or exploitative content.

dbmirror sources content from Danbooru, a third-party platform. Some content may be NSFW or
otherwise objectionable.

The developer is not responsible for any content retrieved from Danbooru.

Server administrators are responsible for configuring dbmirror's behavior to match Discord's

Community Guidelines and server rules.

The developer reserves the right to ban or block dbmirror from certain servers for abuse, policy
violations, or technical reasons.

These terms may be changed at any time. Continued use of dbmirror after changes constitutes
acceptance of the new terms.

Data Usage & Storage
    dbmirror stores the following data:
    - Server IDs and Channel IDs where the bot is active
    - Tags or settings saved per server/channel
    - Post IDs from Danbooru (to avoid duplicates)
    What dbmirror does not store:
    - Personal user data (usernames, messages, etc.)

Data usage:
    - Match image tags with Danbooru posts
    - Send content to appropriate channels
    - Prevent reposts
    All data is stored locally on the server hosting the bot.
    No data is shared with any third parties or external services.
    Removing the bot from your server will stop all data collection.