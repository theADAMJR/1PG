const express = require('express');

const app = express();

console.log(__dirname);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => res.render(`home`));
app.get('/invite', (req, res) => res.redirect('some link'));

app.listen(3000,
  () => console.log('Server is live on port 3000!'));

  // 7EC1BB, 71B1B1, BC9957, E0A755, EFC08D