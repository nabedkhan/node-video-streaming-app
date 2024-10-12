import fs from "node:fs";
import url from "node:url";
import path from "node:path";
import { createServer } from "node:http";

const storage = "./videos";

const server = createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.createReadStream("./index.html").pipe(res);
      return;
    }

    if (req.url.startsWith("/videos")) {
      const route = url.parse(req.url, true);

      // GET ALL VIDEOS
      if (route.pathname === "/videos") {
        fs.readdir(storage, (err, files) => {
          if (err) throw err;

          res.writeHead(200, { "Content-Type": "application/json" });
          const result = files.map((file) => {
            const ext = path.extname(file);
            const filename = path.basename(file, ext);
            return filename;
          });

          res.end(JSON.stringify(result));
        });

        return;
      }

      // GET VIDEO BY ID
      const videoRouteRegex = /^\/videos\/video-(\d+)$/;
      if (videoRouteRegex.test(req.url)) {
        const id = route.pathname.match(videoRouteRegex)[1];
        const videoPath = `${storage}/video-${id}.mp4`;

        if (!fs.existsSync(videoPath)) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Video not found", status: 404 }));
          return;
        }

        const range = req.headers.range;
        let [start, end] = range.replace("bytes=", "").split("-");
        const videoSize = fs.statSync(videoPath).size;

        start = Number(start);
        const chunkSize = 1024 * 512; // .5MB
        end = Math.min(start + chunkSize, videoSize - 1);

        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Content-Length": end - start + 1,
          "Content-Type": "video/mp4",
          "Accept-Ranges": "bytes",
          "access-control-max-age": "86400"
        });

        fs.createReadStream(videoPath, { start, end }).pipe(res);
        return;
      }

      // IF ROUTE DOES NOT FOUND
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Video not found", status: 404 }));
      return;
    }

    // IF ROUTE DOES NOT FOUND
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found", status: 404 }));
  }
});

server.listen(5000, () => {
  console.log("Listening on port 5000");
});
