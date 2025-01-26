const { OAuth2Client } = require('google-auth-library');

const clientId = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(clientId);

async function verifyToken(req, res, next) {

  try {
    const idToken = req.headers.authorization.split(' ')[1];
    console.log("authToken", req.headers.authorization);
    console.log("idToken", idToken);
    console.log("clientId", clientId);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    req.user = payload;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).send('Unauthorized');
  }
}

module.exports = verifyToken; 