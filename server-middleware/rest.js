import express from 'express'
import axios from 'axios';

const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/join-cable/complete', async (req, res, next) => {
  try {
    await axios.post(process.env.API_URL + '/signup/complete', {
      redirectFlowId: req.query.redirect_flow_id
    });
    res.redirect('/account-setup');
  } catch (error) {
    console.log(error.response.data);
    if (error.response.data.code === 'duplicate-email') {
      // TODO: handle this
    }
    next();
  }
});

app.post('/join-cable', async (req, res, next) => {
  try {
    const response = await axios.post(process.env.API_URL + '/signup', {
      email: req.body.email,
      password: req.body.password,
      amount: Number(req.body.amount),
      period: req.body.period,
      payFee: req.body.payFee === 'true',
      completeUrl: process.env.AUDIENCE_URL + '/join-cable/complete'
    })
    res.redirect(response.data.redirectUrl);
  } catch (error) {
    console.log(errir);
    next();
  }
})

export default {
  handler: app
}
