const router = require('express').Router();
const { getUsers, patchUsers } = require('../controllers/users');

router.get('/me', getUsers);
router.patch('/me', patchUsers);
module.exports = router;
