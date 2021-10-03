const express = require("express")
const mongoose = require("mongoose")
const {MONGO_URI} = require("./config")
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

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const mainRoute = require("./routes/main.js");

app.use("/", mainRoute)

module.exports = app
