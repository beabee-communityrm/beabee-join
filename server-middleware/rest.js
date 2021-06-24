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
  req.api = new Api(req.cookies.token);
  next();
});

app.post('/join', wrapAsyncForm(async (req, res) => {
  try {
    const data = await req.api.signUp(req.body, process.env.AUDIENCE_URL + '/join/complete');
    res.redirect(data.redirectUrl);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      res.status(401).send(error.response.data);
    } else {
      throw error;
    }
  }
}));

app.get('/join/complete', wrapAsync(async (req, res) => {
  try {
    const {cookie, jwt} = await req.api.completeSignUp(req.query.redirect_flow_id)
    const match = cookie.match(/session=([^;]+);/)
    res.cookie('session', decodeURIComponent(match[1]), {
      maxAge: 267840000,
      httpOnly: true
    });
    res.cookie('token', jwt);

    res.redirect('/profile/complete');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      switch (error.response.data.code) {
        case 'duplicate-email':
          return res.redirect('/join/duplicate-email');
        case 'restart-membership':
          return res.redirect('/join/restart-membership');
      }
    }

    throw error;
  }
}));

export default {
  handler: app
}
