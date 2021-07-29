import axios from 'axios';
import cookierParser from 'cookie-parser';
import express from 'express';
import multer from 'multer';

import { wrapAsync } from './lib/utils';

import joinRouter from './join';

const app = express();

app.use(cookierParser());
app.use(express.urlencoded({ extended: true }))
app.use(multer().none());

app.use((req, res, next) => {
  req.api = axios.create({
    baseURL: process.env.SERVER_API_URL,
    headers: {
      'Cookie': 'session=' + req.cookies.session
    }
  });
  next();
});

// Proxy API requests
app.get('/_api/*', wrapAsync(async (req, res) => {
  const response = await req.api.get('/' + req.params[0]);
  res.send(response.data);
}));

app.use('/join', joinRouter);

export default {
  handler: app
}
