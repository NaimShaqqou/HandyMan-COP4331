const { ObjectId } = require("mongodb");

// import schema
const User = require("./models/user.js");
const Review = require("./models/reviews.js");

//load card model
const Card = require("./models/card.js");
const Service = require("./models/services.js");

require("express");
require("mongodb");

exports.setApp = function (app, client, cloudinaryParser) {
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
    // incoming: login, password
    // outgoing: id, firstName, lastName, error

    var error = "";
    let results;

    const { login, password } = req.body;

    if (login.includes("@")) {
      results = await User.findOne({ Email: login, Password: password});
    } else {
      results = await User.findOne({ Username: login, Password: password});
    }
    
    var id = -1;
    var fn = "";
    var ln = "";
    var ret;

    if (results == null) {
      id = results._id.valueOf();
      fn = results.FirstName;
      ln = results.LastName;
      try {
        const token = require("./createJWT.js");
        ret = token.createToken(fn, ln, id);
        console.log(ret);
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

    let {
      userId,
      title,
      imageUrl,
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

    const writeResult = await Service.create(
      {
        UserId: userId,
        Title: title,
        ImageUrl: imageUrl,
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
            serviceId: objectInserted.insertedId.valueOf(),
            refreshedToken: refreshedToken,
          };
        }
        console.log(objectInserted)
        res.status(200).json(response);
      }
    );

    
  });

  app.post("/api/delete-service", async (req, res, next) => {
    // incoming: userId, title, jwtToken
    // outgoing: error (optional), jwtToken

    let { userId, title, jwtToken } = req.body;

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
    const deleteResult = Service.deleteOne({ UserId: userId, Title: title }, function (err, result) {
        if (err) {
          response = {
            error: err,
            refreshedToken: refreshedToken,
          };
        } else {
          console.log("Deleted " + result.deletedCount + " documents")
          response = {
            refreshedToken: refreshedToken,
          };
        }
        res.status(200).json(response);
      });
  });

  app.post("/api/change-password", async (req, res, next) => {
    // incoming: userId, oldPassword, newPassword, jwtToken
    // outgoing: error (optional), jwtToken

    let { userId, oldPassword, newPassword, jwtToken } = req.body;

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

    if (oldPassword == newPassword) {
      var r = {
        error: "Passwords can't be the same",
        jwtToken: refreshedToken,
      };
      res.status(200).json(r);
      return;
    }

    userId = ObjectId(userId)

    const user = User.findOneAndUpdate({ _id: userId, Password: oldPassword }, { Password: newPassword}, function(err, objectReturned) {
      if (err) {
        response = { error: err, refreshedToken: refreshedToken };
      } else {
        response = { refreshedToken: refreshedToken };
      }
      console.log(objectReturned)
      res.status(200).json(response);
    });
  });

  app.post("/api/add-review", async (req, res, next) => {
    // incoming: userId, serviceId, reviewer profile picture, ReviewText
    // outgoing: reviewId, error (optional), jwtToken
    var response;

    let {
      userId,
      serviceId,
      //reviewerProfilePic,
      reviewText,
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
              
    userId = ObjectId(userId)
    serviceId = ObjectId(serviceId)
    const review = new Review({UserId: userId, ServiceId: serviceId, ReviewText: reviewText})
    try {
      await review.save();

    } catch (e) {
      console.log(e.message);
    }

    res.send(review);

    var refreshedToken = null;
    try {
      refreshedToken = token.refresh(jwtToken);
    } catch (e) {
      console.log(e.message);
    }

    var ret = { error: error, jwtToken: refreshedToken };

    res.status(200).json(ret);

    // const db = client.db();
    // const writeResult = await db.collection("Reviews").insertOne(
    //   {
    //     UserId: userId,
    //     ServiceId: serviceId,
    //     ReviewText: reviewText,
    //   },
    //   function (err, objectInserted) {
    //     if (err) {
    //       response = {
    //         reviewId: -1,
    //         error: err,
    //         //refreshedToken: refreshedToken,
    //       };
    //     } else {
    //       response = {
    //         serviceId: objectInserted.insertedId.valueOf(),
    //         //refreshedToken: refreshedToken,
    //       };
    //     }
    //     res.status(200).json(response);
    //   }
    // );
  });

  app.post("/api/store-image", cloudinaryParser.single("image"), async (req, res) => {
      res.status(200).json({ imageUrl: req.file.path })
  })


};
