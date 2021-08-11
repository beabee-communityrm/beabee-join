import fs from "fs";
import path from "path";

export default function ContentModule() {
  const contentDir = path.join(this.options.srcDir, "content");
  this.addServerMiddleware({
    path: "_content",
    handler: async function (req, res) {
      const page = req.url;
      return new Promise((resolve, reject) => {
        fs.readFile(
          path.join(contentDir, page + ".json"),
          "utf-8",
          (err, data) => {
            if (err) {
              res.status(404).send();
            } else {
              res.send(JSON.parse(data.toString()));
            }
            resolve();
          }
        );
      });
    }
  });
}
