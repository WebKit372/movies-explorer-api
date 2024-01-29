const router = require('express').Router();
const { getUsers, patchUsers } = require('../controllers/users');
const { userPatchValidation } = require('../utils/validation-config');
const { logout } = require('../controllers/users');

router.get('/me', getUsers);
router.patch('/me', userPatchValidation, patchUsers);
router.get('/logout', logout);
module.exports = router;
