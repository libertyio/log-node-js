const pkg = require('./package.json');

module.exports = {
  input: 'src/main.js',
  output: {
      file: 'dist/main.umd.js',
      format: 'umd',
      name: pkg.name,
  },
};
