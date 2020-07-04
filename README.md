# 1PG

## Prerequisites
- [MongoDB](https://www.mongodb.com/try/download/community); used for saving data
- [NodeJS](https://nodejs.org/en/); used for running the bot

## Before your start

### Create a config.json file
This should be in the root project directory.

![Root Directory](https://i.ibb.co/pJJND6R/root-dir.png)

### Paste this into config.json
```
{
  "bot": {
      "id": "yourDiscordBotId",
      "token": "yourDiscordBotToken",
      "secret": "yourDiscordApplicationSecret"
  },
  "dashboard": {
      "url": "http://localhost:3000"
  },
  "mongoURL": "mongodb://localhost/1PG"
}
```

Remember to edit `yourDiscordBotToken` and other values and replace it with the appropriate values found at the [Discord Developer Portal](https://discord.com/developers)

## Set your redirect URIs
![OAuth Redirect URIs](https://i.ibb.co/n0XMtYn/1pg-oauth.png)
