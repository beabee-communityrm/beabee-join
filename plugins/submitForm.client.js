import axios from 'axios';

async function submitForm(evt) {
  const formEl = evt.target;

  try {
    const response = await axios.post(formEl.action, new FormData(formEl), {
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    if (response.data.redirectUrl) {
      // External URL?
      if (/^(https?:)?\/\//.test(response.data.redirectUrl)) {
        window.location.href = response.data.redirectUrl;
      } else {
        $nuxt.$router.push(response.data.redirectUrl);
      }
    }
    return [null, response];
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const errors = {};
      for (const error of error.response.data.errors) {
        const firstConstraint = Object.keys(error.constraints)[0];
        errors[error.property] = error.constraints[firstConstraint] || 'Invalid value';
      }
      return [errors];
    } else {
      throw error;
    }
  }
}

export default (context, inject) => {
  inject('submitForm', submitForm);
};
