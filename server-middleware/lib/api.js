import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL
});

export async function signUp(data, completeUrl) {
  const response = await api.post('/signup', {
    email: data.email,
    password: data.password,
    amount: Number(data.amount),
    period: data.period,
    payFee: data.payFee === 'true',
    completeUrl
  })

  return response.data.redirectUrl;
}

export async function completeSignUp(redirectFlowId) {
  await api.post('/signup/complete', {redirectFlowId});
}
