const bodyParser = require('body-parser'),
      cookies = require('cookies'),
      express = require('express'),
      methodOverride = require('method-override'),
      { setUser, updateGuilds, validateUser } = require('./middleware');

const authRoutes = require('./routes/auth-routes'),
      dashboardRoutes = require('./routes/dashboard-routes'),
      rootRoutes = require('./routes/root-routes');

const app = express();

app.use(cookies.express('some', 'random', 'keys'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'pug');
app.set('views', __dirname + '/views')

app.use('/', setUser, rootRoutes);
app.use('/', setUser, authRoutes);
app.use('/', setUser, validateUser, updateGuilds, dashboardRoutes);

app.get('*', (req, res) => res.render('errors/404'));

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`))