const http = require('http')
const { handleJson } = require('./')

handleJson(http, (err, body, res) => {
  if (err) {
    console.error(err)
    res.end()
  } else {
    res.end('{"type": "responseOK"}')
  }
})
