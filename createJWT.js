const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.createToken = function (fn, ln, id) {
  return _createToken(fn, ln, id);
};

// Returns back payload used to create jwt
exports.decodeToken = function (token) {
  return _decodeToken(token)
};

_createToken = function (fn, ln, id) {
  try {
    const user = { userId: id, firstName: fn, lastName: ln };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    // In order to expire with a value other than the default, use the
    // following
    /*
      const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, 
         { expiresIn: '30m'} );
                       '24h'
                      '365d'
      */
    var ret = { accessToken: accessToken };
  } catch (e) {
    var ret = { error: e.message };
  }
  return ret.accessToken;
};

exports.isExpired = function (token) {
  var isError = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, verifiedJwt) => {
      console.log(verifiedJwt)
      if (err) {
        return true;
      } else {
        return false;
      }
    }
  );
  return isError;
};

exports.refresh = function (token) {
  var ud = jwt.decode(token, { complete: true });
  var userId = ud.payload.id;
  var firstName = ud.payload.firstName;
  var lastName = ud.payload.lastName;
  return _createToken(firstName, lastName, userId);
};

_decodeToken = function(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}