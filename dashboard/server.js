const cookies = require('cookies');
const express = require('express');
const middleware = require('./middleware');

const authRoutes = require('./routes/auth-routes');
const dashboardRoutes = require('./routes/dashboard-routes');
const rootRoutes = require('./routes/root-routes');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(cookies.express('a', 'b', 'c'));

app.use(express.static(`${__dirname}/assets`));
app.locals.basedir = `${__dirname}/assets`;

app.use('/',
  middleware.updateUser, rootRoutes,
  authRoutes,
  middleware.validateUser, middleware.updateGuilds, dashboardRoutes
);

app.get('*', (req, res) => res.render('errors/404'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is live on port ${port}`));