const Router = require('express').Router();

Router.get('/', (req, res) => {
  return res.json({ Hello: "World"})
})

module.exports = Router;