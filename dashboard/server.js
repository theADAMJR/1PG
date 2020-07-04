const cookies = require('cookies'),
      express = require('express'),
      { setUser, validateUser } = require('./middleware');

const authRoutes = require('./routes/auth-routes'),
      dashboardRoutes = require('./routes/dashboard-routes'),
      rootRoutes = require('./routes/root-routes');

const app = express();

app.use(cookies.express("some", "random", "keys"));
app.use(setUser)

app.set('view engine', 'pug');
app.set('views', __dirname + '/views')

app.use('/', rootRoutes);
app.use('/', authRoutes);
app.use('/', validateUser, dashboardRoutes);

app.get('*', (req, res) => res.render('errors/404'));

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`))