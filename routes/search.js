const express = require("express").Router;
const DATA = require("../models/index")

const app = express();

app.get("/", async (req, res) => {
  try {
    const {keyword} = req.query;
    const keyword_search = await DATA.find({title: new RegExp(keyword, "i")})
    res.json(keyword_search)
  } catch (err) {
    res.status(400).json({msg: err, status: 400})
  }
})

module.exports = app