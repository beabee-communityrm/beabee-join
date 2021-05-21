import axios from 'axios';

async function submitForm(evt) {
  const formEl = evt.target;

  try {
    const response = await axios.post(formEl.action, new FormData(formEl), {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    if (response.data.redirectUrl) {
      // TODO: should this use the nuxt router?
      window.location.href = response.data.redirectUrl;
    }
    return response;
  } catch (err) {
    // TODO: Form error handling
    console.log(err);
  }
}

export default (context, inject) => {
  inject('submitForm', submitForm);
};
