import http from 'http';
import fs from 'fs';
import mime from 'mime';

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
      filePath = './index.html';
  }

  fs.readFile(filePath, (err, content) => {
      if (err) {
          if (err.code === 'ENOENT') {
              res.writeHead(404);
              res.end('404 Not Found');
          } else {
              res.writeHead(500);
              res.end(`Server Error: ${err.code}`);
          }
      } else {
          const contentType = mime.getType(filePath) || 'text/plain';
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
      }
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});