import axios from 'axios';
import cookierParser from 'cookie-parser';
import express from 'express';
import multer from 'multer';

import { wrapAsync, wrapAsyncForm } from './lib/utils';

const app = express()

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

app.post('/join', wrapAsyncForm(async (req, res) => {
  const response = await req.api.post('/signup', {
    email: data.email,
    password: data.password,
    amount: Number(data.amount),
    period: data.period,
    payFee: data.payFee === 'true',
    completeUrl: process.env.AUDIENCE_URL + '/join/complete'
  });

  res.redirect(response.data.redirectUrl);
}));

app.get('/join/complete', wrapAsync(async (req, res) => {
  try {
    const response = await req.api.post('/signup/complete', {
      redirectFlowId: req.query.redirect_flow_id
    });

    // Pass the cookie along
    const cookie = response.headers['set-cookie'].find(s => s.startsWith('session'));
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
  await req.api.put('/member/me', {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    profile: {
      deliveryOptIn: req.body.profile.deliveryOptIn === 'true',
      deliveryAddress: req.body.profile.deliveryAddress,
      newsletterStatus: req.body.profile.newsletterStatus || 'unsubscribed'
    }
  });
  res.redirect('/profile');
}));

// Proxy API requests
app.get('/_api/*', wrapAsync(async (req, res) => {
  const response = await req.api.get('/' + req.params[0]);
  res.send(response.data);
}));

export default {
  handler: app
}
