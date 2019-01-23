const { head } = require('./config/head')
const { message: defaultMessage } = require('./config/message')
const { io: { host, port, log } } = require('./config/io')

function handleJson (http, callback) {
  const app = http.createServer((request, response) => {
    const { method, url } = request
    const meturl = method + url
    if (meturl === 'POST/') {
      let bodyArr = []
      request.on('error', err => {
        response.writeHead(500, head)
        response.end()
        callback(err)
      }).on('data', chunk => {
        // limitar bodyArr.length
        bodyArr.push(chunk)
      }).on('end', () => {
        let body
        try {
          body = JSON.parse(Buffer.concat(bodyArr))
        } catch (err) {
          response.writeHead(400, head)
          response.end()
          callback(err)
        }
        if (body) {
          response.writeHead(200, head)
          callback(null, body, response)
        }
      })
    } else if (meturl === 'GET/') {
      response.writeHead(200, head)
      response.end(defaultMessage)
      log(meturl)
    } else if (url !== '/') {
      response.writeHead(404, head)
      response.end()
      log('404')
    } else if (method !== 'POST') {
      response.writeHead(405, head)
      response.end()
      log('405')
    } else {
      response.writeHead(400, head)
      response.end()
      log('400')
    }
  }).listen({ host, port }, err => {
    if (err) {
      callback(err)
    } else {
      log(JSON.stringify(app.address(), null, 2))
    }
  })
}

exports.handleJson = handleJson
