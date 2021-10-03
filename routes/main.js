const express = require("express").Router;
const DATA = require("../models/index")
const router = express();

router.get("/", async (req, res) => {
    res.json(await DATA.find())
})

router.post("/", async (req, res) => {
   const {author, title, thumbnail} = req.body;
    const test = DATA({
    title,
    thumbnail,
    author,
    })
    await test.save()
})

module.exports = router