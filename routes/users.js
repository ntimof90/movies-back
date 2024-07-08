const router = require('express').Router();

const { getUser, updateUser } = require('../controllers/users');
const { updateValidator } = require('../middlewares/validator');

router.get('/me', getUser);
router.patch('/me', updateValidator, updateUser);

module.exports = router;
