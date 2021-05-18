import express from 'express'
const axios = require('axios')

var app = express()
app.use(express.urlencoded({ extended: true }))

app.post('/send', (req, res) => {
  var amount = req.body.amount
  console.log(req.body)

  axios.post('https://ptsv2.com/t/xyxzu-1620661181/post', {
    amount: amount,
  })
  .then(function (response) {
    console.log(response.data);
    res.sendStatus(200)
  })
  .catch(function (error) {
    console.log(error);
  })

})

export default {
    path: '/api',
    handler: app
}
