const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const dotenv = require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

require('./routes')(app);

sequelize.sync({ force: false })
  .then(() => {
    app.listen(process.env.APP_PORT, () => console.log('Server running on http://localhost:3000'));
  });
