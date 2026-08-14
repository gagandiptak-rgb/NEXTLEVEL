const jsonStringify = (jsonobject) => {
  try {
    const jsonString = JSON.stringify(jsonobject);
    return jsonString;
  } catch (error) {
    console.error(error);
  }
}
const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('next.html');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});