import express from "express";
import cors from "cors";
import session from 'express-session';
import dotenv from "dotenv";
import db from './config/Database.js';
import SequelizeStore from "connect-session-sequelize";
import UserRoute from './routes/UserRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import AuthRoute from './routes/AuthRoute.js';

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db
});

// megeksekusi queri atau membuat tabel di database
// (async() => {
//  await db.sync();
// })();

// session
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    // jika http set secure menjadi false, jika https set secure true atau bisa juga menggunakan auto
    secure: 'auto'
  }
}));

// middleware
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log('Server up and running...')
});