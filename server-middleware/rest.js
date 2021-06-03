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
  const data = await req.api.signUp(req.body, process.env.AUDIENCE_URL + '/join/complete');
  res.redirect(data.redirectUrl);
}));

app.get('/join/complete', wrapAsync(async (req, res) => {
  try {
    const {cookie, jwt} = await req.api.completeSignUp(req.query.redirect_flow_id)
    res.set({'set-cookie': cookie});
    res.cookie('token', jwt);

    res.redirect('/profile/complete');
  } catch (error) {
    console.log(error);
    if (error.response.data.code === 'duplicate-email') {
      // TODO: handle duplicate emails
    } else {
      throw error;
    }
  }
}));

export default {
  handler: app
}
