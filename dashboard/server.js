const config = require('../config.json'),
      cookies = require('cookies'),
      express = require('express');

const dashboardRoutes = require('./routes/dashboard-routes'),
      rootRoutes = require('./routes/root-routes');

const app = express();

app.use(cookies.express("some", "random", "keys"));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views')

app.use('/', rootRoutes);
app.use('/', dasboardRoutes)

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`))