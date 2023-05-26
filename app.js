const express = require('express');
const mongoose = require('mongoose').default;
const index = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '646e53e0289c0631a4c0985a',
  };
  next();
});
app.use('/', index);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
