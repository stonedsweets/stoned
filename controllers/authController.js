const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model
const passport = require('../middleware/passportConfig');

exports.renderLoginPage = (req, res) => {
  res.render('login');
};

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
      console.log('User logged in:', user);
      console.log('Session:', req.session);
      return res.redirect('/admin');
    });
  })(req, res, next);
};

// User signup logic
exports.signupUser = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  // Basic validation
  if (password !== confirmPassword) {
    req.flash('error_msg', 'Passwords do not match');
    return res.redirect('/admin');
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ where: { email } });
    if (user) {
      req.flash('error_msg', 'Email already registered');
      return res.redirect('/signup');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Log in the user after signup
    req.logIn(user, (err) => {
      if (err) return next(err);
      req.flash('success_msg', 'You are now signed up and logged in');
      return res.redirect('/admin');
    });
  } catch (err) {
    console.error('Error during signup:', err); // Log the error
    req.flash('error_msg', 'An error occurred during signup');
    return res.redirect('/signup');
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
