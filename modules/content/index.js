import path from 'path';

export default function ContentModule() {
  this.addPlugin({
    fileName: 'content/plugin.server.js',
    src: path.join(__dirname, 'templates/plugin.server.js'),
    options: {
      contentDir: path.join(this.options.srcDir, 'content')
    }
  });
}
