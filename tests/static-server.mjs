import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png" };

createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const relative = normalize(pathname === "/" ? "index.html" : pathname.slice(1));
  const file = join(root, relative);

  if (!file.startsWith(root)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    await stat(file);
    response.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(8765, "127.0.0.1", () => console.log("Static test server: http://127.0.0.1:8765"));
