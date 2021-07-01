import cookierParser from 'cookie-parser';
import express from 'express';
import multer from 'multer';

import Api from './lib/api';
import { wrapAsync, wrapAsyncForm } from './lib/utils';

const app = express()

app.use(cookierParser());
app.use(express.urlencoded({ extended: true }))
app.use(multer().none());

app.use((req, res, next) => {
  req.api = new Api(req.cookies.session);
  next();
});

app.post('/join', wrapAsyncForm(async (req, res) => {
  try {
    const data = await req.api.signUp(req.body, process.env.AUDIENCE_URL + '/join/complete');
    res.redirect(data.redirectUrl);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      res.status(400).send(error.response.data);
    } else {
      throw error;
    }
  }
}));

app.get('/join/complete', wrapAsync(async (req, res) => {
  try {
    const {cookie} = await req.api.completeSignUp(req.query.redirect_flow_id)
    const match = cookie.match(/session=([^;]+);/)

    res.cookie('session', decodeURIComponent(match[1]), {
      maxAge: 267840000,
      httpOnly: true
    });

    res.redirect('/join/setup');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      switch (error.response.data.code) {
        case 'duplicate-email':
          return res.redirect('/join/duplicate-email');
        case 'restart-membership':
          return res.redirect('/join/restart-membership');
      }
    }

    res.redirect('/join/failed');
  }
}));

app.post('/join/setup', wrapAsyncForm(async (req, res) => {
  res.redirect('/profile');
}));

app.get('/_api/*', wrapAsync(async (req, res) => {
  const response = await req.api.instance.get('/' + req.params[0]);
  res.send(response.data);
}));

export default {
  handler: app
}
