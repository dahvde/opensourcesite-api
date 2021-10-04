const express = require("express").Router;
const DATA = require("../models/index")
const router = express();

router.get("/", async (req, res) => {
    res.json(await DATA.find())
})

router.post("/", validParams, async (req, res) => {
  try {
    const {author, title, thumbnail} = req.body;
    const test = DATA({
    title,
    thumbnail,
    author,
    })
    const saveResponse = await test.save()
    res.send(saveResponse)
  } catch (err) {
    res.status(400).json({msg: err, status: 400})
  }
})

function validParams(req, res, next) {
  try {
    const {author, title, thumbnail} = req.body;
    const messages = {
      "author": ["Author", null],
      "title": ["Title", null],
      "thumbnail": ["Thumnail", null]
    };

    let message_filter = [
      messages["author"][Boolean(author) * 1],
      messages["title"][Boolean(title) * 1],
      messages["thumbnail"][Boolean(thumbnail) * 1]
    ].filter((i) => i);

    if (message_filter.length) {
      if (message_filter.length - 1) {
        message_filter = lastIndexPrepend(message_filter)
      }
      let concat_message = message_filter.join(", ");
      throw `${concat_message} not present in body`;
    }
    next();
  } catch (err) {
    res.status(400).json({msg: err, status: 400});
  }
}

function lastIndexPrepend(values, pre_pendstr) {
  const last_index = values.length - 1
  const last_message = values[last_index]
  values[last_index] = "and " + last_message
  return values
}

module.exports = router