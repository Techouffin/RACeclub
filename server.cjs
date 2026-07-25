// Minimal zero-dependency static file server for the Rotaract E-Club site.
// No npm install, no Vite — just Node's built-in http + fs.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5500;
const ROOT = __dirname;
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".png": "image/png",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".webp": "image/webp"
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  const filePath = path.join(ROOT, path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, ""));
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Not Found</h1>");
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Rotaract site running at http://localhost:${PORT}`));
