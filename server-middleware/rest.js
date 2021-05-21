import express from 'express'
import multer from 'multer';

import { signUp, completeSignUp } from './lib/api';
import { wrapAsync, wrapAsyncForm } from './lib/utils';

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(multer().none());

app.post('/join-cable', wrapAsyncForm(async (req, res) => {
  const redirectUrl = await signUp(req.body, process.env.AUDIENCE_URL + '/join-cable/complete');
  res.redirect(redirectUrl);
}));

app.get('/join-cable/complete', wrapAsync(async (req, res) => {
  try {
    await completeSignUp(req.query.redirect_flow_id)
    res.redirect('/account-setup');
  } catch (error) {
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
