import fs from 'fs';
import path from 'path';

async function content(page) {
  const data = await new Promise((resolve, reject) => {
    fs.readFile(path.join('<%= options.contentDir %>', page + '.json'), 'utf-8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
  return JSON.parse(data.toString());
}

export default (context, inject) => {
  inject('content', content)
};
