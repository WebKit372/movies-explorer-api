const router = require('express').Router();
const { getUserInfo, patchUsers } = require('../controllers/users');
const { userPatchValidation } = require('../utils/validation-config');
const { logout } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', userPatchValidation, patchUsers);
router.get('/logout', logout);
module.exports = router;
