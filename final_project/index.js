const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

app.use("/customer/auth/*", function auth(req, res, next) {
  // Get the token from the request headers or query parameters
  const token = req.headers['x-access-token'] || req.query.token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. Token is required.' });
  }

  // Verify the token
  jwt.verify(token, 'your_secret_key', function (err, decoded) {
    if (err) {
      return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
    }

    // Save the decoded user information in the request object for further use
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  });
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));

