module.exports = (name, path) => ({
  module: 'rotating-file-stream',
  args: [
    name,
    {
      path,
      interval: process.env.LOGINTEVAL,
      size: process.env.LOGSIZE,
    },
  ],
});
