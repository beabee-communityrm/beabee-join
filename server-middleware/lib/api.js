import axios from 'axios';

export default class Api {
  constructor(session) {
    this.instance = axios.create({
      baseURL: process.env.SERVER_API_URL,
      headers: {
        'Cookie': 'session=' + session
      }
    });
  }

  async signUp(data, completeUrl) {
    const response = await this.instance.post('/signup', {
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
    const response = await this.instance.post('/signup/complete', {redirectFlowId});
    return {
      cookie: response.headers['set-cookie'].find(s => s.startsWith('session')),
    };
  }

  async getMember(id) {
    const response = await this.instance.get('/member/' + id);
    return response.data;
  }
}
