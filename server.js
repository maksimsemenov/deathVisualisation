const webpack = require('webpack')
const DevServer = require('webpack-dev-server')
const config = require('./webpack.config')

const server = new DevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: { color: true },
})

server.listen(4000, 'localhost', (err, result) => {
  if (err) {
    console.log(err)
  }

  console.log('Listening at localhost:4000')
})
