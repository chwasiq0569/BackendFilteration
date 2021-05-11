const router = require('express').Router();

router.get('/', (req, res) => res.send("GET ROUTE"))

module.exports = router