const express = require('express');
const routes = require('./controllers/');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require(`express-session`);
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Sets Handlebars as the default template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Sets up the sessions with the 'secret', 'resave', 'saveUninitialized' options
app.use(
  session({
    secret: 'This is a major secret!',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize
    })
  })
);

// turn on routes
app.use(routes);

// turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });

app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});

