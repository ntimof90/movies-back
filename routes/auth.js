const router = require('express').Router();

const { signup, signin, signout } = require('../controllers/auth');
const { signupValidator, signinValidator } = require('../middlewares/validator');

router.post('/signup', signupValidator, signup);
router.post('/signin', signinValidator, signin);
router.post('/signout', signout);

module.exports = router;
