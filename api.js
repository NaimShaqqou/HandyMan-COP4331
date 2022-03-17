const { ObjectId } = require("mongodb");
const User = require("./models/user.js");
//load card model
const Card = require("./models/card.js");

require("express");
require("mongodb");

exports.setApp = function (app, client) {
  var token = require("./createJWT.js");

  app.post("/api/addcard", async (req, res, next) => {
    // incoming: userId, color, jwtToken
    // outgoing: error

    const { userId, card, jwtToken } = req.body;
    try {
      if (token.isExpired(jwtToken)) {
        var r = { error: "The JWT is no longer valid", jwtToken: "" };
        res.status(200).json(r);
        return;
      }
    } catch (e) {
      console.log(e.message);
    }

  //const newCard = { Card: card, UserId: userId };
  const newCard = new Card({ Card: card, UserId: userId });
  var error = '';
  try 
 {
    // const db = client.db();
    // const result = db.collection('Cards').insertOne(newCard);
    newCard.save();
  }
  catch (e) 
 {
    error = e.toString();
  }

    var refreshedToken = null;
    try {
      refreshedToken = token.refresh(jwtToken);
    } catch (e) {
      console.log(e.message);
    }

    var ret = { error: error, jwtToken: refreshedToken };

    res.status(200).json(ret);
  });

  app.post("/api/searchcards", async (req, res, next) => {
    // incoming: userId, search, jwtToken
    // outgoing: results[], error

    var error = "";

    const { userId, search, jwtToken } = req.body;
    try {
      if (token.isExpired(jwtToken)) {
        var r = { error: "The JWT is no longer valid", jwtToken: "" };
        res.status(200).json(r);
        return;
      }
    } catch (e) {
      console.log(e.message);
    }

    var _search = search.trim();
    //   const db = client.db();
    //   const results = await db.collection('Cards').find({ "Card": { $regex: _search + '.*', $options: 'r' } }).toArray();
    const results = await Card.find({ "Card": { $regex: _search + '.*', $options: 'r' } });
  
  

    var _ret = [];
    for (var i = 0; i < results.length; i++) {
      _ret.push(results[i].Card);
    }

    var refreshedToken = null;
    try {
      refreshedToken = token.refresh(jwtToken);
    } catch (e) {
      console.log(e.message);
    }

    var ret = { results: _ret, error: error, jwtToken: refreshedToken };

    res.status(200).json(ret);
  });

  app.post("/api/login", async (req, res, next) => {
    // incoming: email, password
    // outgoing: id, firstName, lastName, error

    var error = "";

    const { login, password } = req.body;
    // const db = client.db();
    // const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
    const results = await User.find({ Login: login, Password: password });
  

    var id = -1;
    var fn = "";
    var ln = "";
    var ret;

    if (results.length > 0) {
      id = results[0]._id.valueOf();
      fn = results[0].FirstName;
      ln = results[0].LastName;
      try {
        const token = require("./createJWT.js");
        ret = token.createToken(fn, ln, id);
        console.log(ret)
      } catch (e) {
        ret = { error: e.message };
      }
    } else {
      ret = { error: "Email/Password incorrect", id: id };
    }
    
    res.status(200).json(ret);
  });

  app.post("/api/add-service", async (req, res, next) => {
    // incoming: userId, title, longitude, latitude, description, price, daysAvailable, category, jwtToken
    // outgoing: serviceId, error (optional), jwtToken
    var response;

    const {
      userId,
      title,
      longitude,
      latitude,
      description,
      price,
      daysAvailable,
      category,
      jwtToken,
    } = req.body;

    try {
      if (token.isExpired(jwtToken)) {
        var r = { error: "The JWT is no longer valid", jwtToken: "" };
        res.status(200).json(r);
        return;
      }
    } catch (e) {
      console.log(e.message);
    }

    var refreshedToken = null;
    try {
      refreshedToken = token.refresh(jwtToken);
    } catch (e) {
      console.log(e.message);
    }

    userId = ObjectId(userId)

    const db = client.db();
    const writeResult = await db.collection("Services").insertOne(
      {
        UserId: userId,
        Title: title,
        Longitude: longitude,
        Latitude: latitude,
        Description: description,
        Price: price,
        DaysAvailable: daysAvailable,
        Category: category,
      },
      function (err, objectInserted) {
        if (err) {
          response = {
            serviceId: -1,
            error: err,
            refreshedToken: refreshedToken,
          };
        } else {
          response = {
            serviceId: objectInserted[0]._id,
            refreshedToken: refreshedToken,
          };
        }
      }
    );

    res.status(200).json(response);
  });

  app.post("api/delete-service", async (req, res, next) => {
    // incoming: userId, title, jwtToken
    // outgoing: error (optional), jwtToken

    const { userId, title, jwtToken } = req.body;

    var response;

    try {
      if (token.isExpired(jwtToken)) {
        var r = { error: "The JWT is no longer valid", jwtToken: "" };
        res.status(200).json(r);
        return;
      }
    } catch (e) {
      console.log(e.message);
    }

    var refreshedToken = null;
    try {
      refreshedToken = token.refresh(jwtToken);
    } catch (e) {
      console.log(e.message);
    }

    userId = ObjectId(userId)

    const db = client.db();
    const deleteResult = db
      .collection("Services")
      .deleteOne({ UserId: userId, Title: title }, function (err, result) {
        if (err) {
          response = {
            error: err,
            refreshedToken: refreshedToken,
          };
        } else {
          response = {
            refreshedToken: refreshedToken,
          };
        }
      });

    res.status(200).json(response);
  });

  app.post("api/change-password", async (req, res, next) => {
    // incoming: userId, oldPassword, newPassword, jwtToken
    // outgoing: error (optional), jwtToken

    const { userId, oldPassword, newPassword, jwtToken } = req.body;

    try {
      if (token.isExpired(jwtToken)) {
        var r = { error: "The JWT is no longer valid", jwtToken: "" };
        res.status(200).json(r);
        return;
      }
    } catch (e) {
      console.log(e.message);
    }

    var refreshedToken = null;
    try {
      refreshedToken = token.refresh(jwtToken);
    } catch (e) {
      console.log(e.message);
    }

    userId = ObjectId(userId)

    const db = client.db();
    const user = db
      .collection("Users")
      .findOne({ _id: userId, Password: oldPassword });

    if (!user) {
      var r = {
        error: "Old password is not correct",
        jwtToken: refreshedToken,
      };
      res.status(200).json(r);
      return;
    }

    if (oldPassword == newPassword) {
      var r = {
        error: "Passwords can't be the same",
        jwtToken: refreshedToken,
      };
      res.status(200).json(r);
      return;
    }

    db.collection("Users").update(
      { user },
      { $set: { Password: oldPassword } },
      function (err, objectReturned) {
        if (err) {
          response = { error: err, refreshedToken: refreshedToken };
        } else {
          response = { refreshedToken: refreshedToken };
        }
      }
    );

    res.status(200).json(response);
  });
};
