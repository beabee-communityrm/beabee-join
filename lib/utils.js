import axios from 'axios';

export async function submitForm(formEl) {
  return await axios.post(formEl.action, new FormData(formEl), {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}
