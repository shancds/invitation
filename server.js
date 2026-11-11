// Tiny zero-dependency static server:  npm start  →  http://localhost:3000
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".webp": "image/webp", ".mp3": "audio/mpeg", ".ico": "image/x-icon", ".json": "application/json",
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  let file = path.normalize(path.join(ROOT, urlPath === "/" ? "index.html" : urlPath));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end("Forbidden"); }
  fs.stat(file, (err, st) => {
    if (!err && st.isDirectory()) file = path.join(file, "index.html");
    fs.readFile(file, (e, data) => {
      if (e) { res.writeHead(404); return res.end("Not found"); }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream" });
      res.end(data);
    });
  });
}).listen(PORT, "0.0.0.0", () => {
  console.log(`\n  Wedding invitation running:\n  → Local:   http://localhost:${PORT}`);
  Object.values(os.networkInterfaces()).flat()
    .filter((n) => n && n.family === "IPv4" && !n.internal)
    .forEach((n) => console.log(`  → Phone:   http://${n.address}:${PORT}   (same Wi-Fi)`));
  console.log("");
});
