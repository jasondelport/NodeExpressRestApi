var express = require('express'),
    router = express.Router(),
    nobelprizes = require('./nobelprizes');

router.get('/nobelprizes', nobelprizes.findAll);
router.get('/nobelprizes/:id', nobelprizes.findById);
router.post('/nobelprizes', nobelprizes.addNobelPrize);
router.put('/nobelprizes/:id', nobelprizes.updateNobelPrize);
router.delete('/nobelprizes/:id', nobelprizes.deleteNobelPrize);

module.exports = router;
