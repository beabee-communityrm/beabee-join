import axios from 'axios';

export default class Api {
  constructor(token) {
    this.api = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  async signUp(data, completeUrl) {
    const response = await this.api.post('/signup', {
      email: data.email,
      password: data.password,
      amount: Number(data.amount),
      period: data.period,
      payFee: data.payFee === 'true',
      completeUrl
    })
    return response.data;
  }

  async completeSignUp(redirectFlowId) {
    const response = await this.api.post('/signup/complete', {redirectFlowId});
    return {
      cookie: response.headers['set-cookie'],
      jwt: response.data.jwt
    };
  }
}
