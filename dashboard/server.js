const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
  res.render('test.pug');
});

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`))