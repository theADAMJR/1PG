const express = require('express');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => res.render('index'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is live on port ${port}`));