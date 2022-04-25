// Code was inspired from https://qiita.com/suin/items/0ca6d44c7671abdc032b .
import {createServer, request} from 'http'

createServer((clientReq, clientRes) => {
  const serverReq = request({
    host: '127.0.0.1',
    port: 8080,
    method: clientReq.method,
    path: clientReq.url,
    headers: Object.assign(clientReq.headers, { 'X-Forwarded-Proto': 'https' })
  }).on('error', () => clientRes.writeHead(502).end())
    .on('timeout', () => clientRes.writeHead(504).end())
    .on('response', serverRes => {
      clientRes.writeHead(serverRes.statusCode, serverRes.headers)
      serverRes.pipe(clientRes)
    })
  clientReq.pipe(serverReq)
}).listen(9090)
