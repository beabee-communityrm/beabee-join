import axios from 'axios';

export default (context, inject) => {
  inject('content', async page => {
    const response = await axios.get(process.env.AUDIENCE_URL + '/_content/' + page);
    return response.data;
  });
};
