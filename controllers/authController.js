// controllers/authController.js
const passport = require('../middleware/passportConfig');

exports.renderLoginPage = (req, res) => {
  res.render('login');
};

exports.loginUser = (req, res, next) => {
  console.log('Login attempt:', req.body); // Log the login attempt with username and password
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err); // Log authentication error
      return next(err);
    }
    if (!user) {
      console.log('Authentication failed:', info ? info.message : 'Unknown reason'); // Log failure reason
      req.flash('error_msg', info ? info.message : 'Invalid credentials'); // Add flash message for failure
      return res.redirect('/login'); // Redirect to login page on failure
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error during login:', err); // Log login error
        return next(err);
      }
      console.log('User successfully logged in:', user); // Log successful login
      console.log('Session data:', req.session); // Log session details
      return res.redirect('/baker'); // Redirect to admin page on success
    });
  })(req, res, next);
};
 

exports.logoutUser = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash('success_msg', 'You are logged out');
    req.session.destroy();
    res.redirect('/');
  });
};