const express = require("express");
const {success} = require("consola");
const server = express();
const app = require("./index.js")

server.use(app);

server.listen(3000, () => {
  success({
    message: "[SERVER] listening on port 3000",
    badge: true
  })
})
