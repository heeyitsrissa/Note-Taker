const express = require('express');
const router = express.Router();

// Define your API routes here
router.get('/example', (req, res) => {
  res.send('This is an example route');
});

module.exports = router;