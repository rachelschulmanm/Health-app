const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const auth = require('../../middleware/auth');


// Bring in User & Post models
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route       POST api/user
// @desc        Register user
// @access      Public
router.post(
  '/',
  body('name', 'Name is required').not().isEmpty(),
  body('email', `Enter a valid email`).isEmail(),
  body('gender', `Gender is required`).not().isEmpty(),
  body(
    'password',
    'Password must be 6 charcater or more, must contains uppercase lowercase, number & symbol'
  ).matches(
    /^[A-Za-z\d@$!%*?&]{6,}$/,
    'i'
  ),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, gender } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        password,
        gender,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error('💥 ' + err.message);
      res.status(500).send('Server error');
    }
  }
);

router.delete('/', auth, async (req, res) => {
  try {
    // Remove user's posts
    await Post.deleteMany({ user: req.user.id });

    // Remove the user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'The user has removed' });
  } catch (err) {
    console.error('💥 ' + err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
