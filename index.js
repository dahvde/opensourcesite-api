const express = require("express")
const mongoose = require("mongoose")
const {MONGO_URI} = require("./config")
const morgan = require("morgan");
const cors = require("cors")
const {success, error} = require("consola")

const app = express();

mongoose.connect(MONGO_URI)
.then(() => {
  success({
    message: "[DB] Connected",
    badge: true
  })
})
.catch((err) => {
  error({
    message: "[DB] " + err,
    badge: true
  })
})

global.DB_BASE = mongoose.connection

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// v Morgan logs copied from https://stackoverflow.com/a/61936936/16534117 v

morgan.token('splitter', (req) => {
  return "\x1b[35m--------------------------------------------\x1b[0m\n";
});
morgan.token('statusColor', (req, res, args) => {
  // get the status code if response written
  var status = (typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent)
      ? res.statusCode
      : undefined

  // get status color
  var color = status >= 500 ? 31 // red
      : status >= 400 ? 33 // yellow
          : status >= 300 ? 36 // cyan
              : status >= 200 ? 32 // green
                  : 0; // no color

  return '\x1b[' + color + 'm' + status + '\x1b[0m';
});
app.use(morgan(`:splitter\x1b[33m:method\x1b[0m \x1b[36m:url\x1b[0m :statusColor :response-time ms`));

// ^ Morgan logs end ^

const mainRoute = require("./routes/main.js");
const searchRoute = require("./routes/search")

app.use("/", mainRoute)
app.use("/search", searchRoute)

module.exports = app
