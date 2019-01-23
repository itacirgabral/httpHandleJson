const { io: { host, port } } = require('./io')

const message = {
  'type': 'defaultMessage',
  'payload': {
    host,
    port,
    'method': 'POST',
    'fetch': `fetch('http://${host}:${port}/', { method: 'POST', body:'{ }'}).then(e => e.json()).then(console.dir)`,
    'actions': []
  }
}

exports.message = JSON.stringify(message)
