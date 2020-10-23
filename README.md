# 1PG
This is a the project used was made during a [YouTube series/course](https://www.youtube.com/watch?v=H2xkRFabWM8&list=PLGfT2ttRbfizDIRPIqzNvyIlrFJ-d7sm0).

## Setup

Make a file `config.json`:
```json
{
  "bot": {
    "id": "<bot_id>",
    "secret": "<client_secret>",
    "token": "<bot_token>"
  },
  "dashboardURL": "http://localhost:3000",
  "mongoURI": "mongodb://localhost/1PG-Demo"
}
```

### Make sure `config.json` is in `.gitignore`.
This will help secure your bot token, and make sure your bot does not get hacked.

## Set Redirect URIs
+ http://localhost:3000/auth
+ http://localhost:3000/auth-guild

In the **[Developer Portal](https://discord.com/developers)** -> **Your Application** -> **OAuth2** 
