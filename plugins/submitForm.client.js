import axios from 'axios';

export default (context, inject) => {
  inject('submitForm', async evt => {
    const formEl = evt.target;

    try {
      const response = await axios.post(formEl.action, new FormData(formEl), {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (response.data.redirectUrl) {
        // External URL?
        if (/(https?:)?\/\//.test(response.data.redirectUrl)) {
          window.location.href = response.data.redirectUrl;
        } else {
          $nuxt.$router.push(response.data.redirectUrl);
        }
      }
      return response;
    } catch (err) {
      // TODO: Form error handling
      console.log(err);
    }

  });
};
