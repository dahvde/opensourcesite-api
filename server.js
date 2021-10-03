const express = require("express");
const {success} = require("consola");
const server = express();
const {PORT} = require("./config")
const app = require("./index.js")

server.use(app);

server.listen(PORT, () => {
  success({
    message: "[SERVER] listening on port " + PORT,
    badge: true
  })
})
