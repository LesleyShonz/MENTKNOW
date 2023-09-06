const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from header
    const tokenHeader = config.get('tokenHeader') || 'x-auth-token';
    const token = req.header(tokenHeader);

    // Check if token doesn't exist
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Use the JWT_SECRET from the config (fallback to process.env if you prefer)
    const jwtSecret = config.get('JWT_SECRET') || process.env.JWT_SECRET;

    // Ensure jwtSecret is set
    if (!jwtSecret) {
        console.error('JWT_SECRET not set in environment or config');
        return res.status(500).send('Server error');
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, jwtSecret);

        // Store the decoded user info in the request for downstream handlers
        req.user = decoded.user;
        console.log(req.user)
        console.log(decoded.user)
        next();
    } catch (err) {
        console.error('Error verifying token:', err.message);  // Additional logging for better diagnostics
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
