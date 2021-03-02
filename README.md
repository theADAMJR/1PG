# 1PG
1PG Course - https://udemy.com/course/create-the-best-discord-bot/?referralCode=5CB95A4D9309B1F54560

Create a Discord Bot Dashboard Series - https://www.youtube.com/watch?v=tpIQM90o_pY&list=PLGfT2ttRbfizUIO1YEITWaquqBsNqHv7v&index=1

## .env

Make a file `.env`:
```js
BOT_TOKEN=""
CLIENT_ID=""
CLIENT_SECRET=""
DASHBOARD_URL="http://localhost:3000"
MONGO_URI="mongodb://localhost/1PG"
PORT=3000
```

## Set Redirect URIs
+ http://localhost:3000/auth
+ http://localhost:3000/auth-guild

In the **[Developer Portal](https://discord.com/developers)** -> **Your Application** -> **OAuth2** 
