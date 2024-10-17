const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model
const passport = require('../middleware/passportConfig');

// Render login page
exports.renderLoginPage = (req, res) => {
  res.render('login');
};

// Render signup page
exports.renderSignupPage = (req, res) => {
  res.render('signup');
};

// User login logic using passport
exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/login');
    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log('User logged in:', user); // Log user details
      console.log('Session:', req.session); // Log session details
      return res.redirect('/admin');
    });
  })(req, res, next);
};

// User signup logic
exports.signupUser = async (req, res, next) => {
  const { username, email, password, 'confirm-password': confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send('User already exists');
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error('Error in signup:', err);
    res.status(500).send('Server error');
  }
};

// User logout logic
exports.logoutUser = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash('success_msg', 'You are logged out');
    req.session.destroy();
    res.redirect('/');
  });
};
