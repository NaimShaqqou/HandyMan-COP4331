const { ObjectId } = require("mongodb");

// import schema
const User = require("./models/user.js");
const Review = require("./models/reviews.js");

//load card model
const Card = require("./models/card.js");
const Service = require("./models/services.js");
const { ObjectID } = require("bson");

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

    let error = "";
    let results;

    const { login, password } = req.body;
    let parameter = "";

    console.log("Given:");
    console.log(req.body);
    
    if (login.includes("@")) {
      parameter = "Email";
    } else {
      parameter = "Username";
    }
    
    let id = -1;
    let fn = "";
    let ln = "";
    let ret;

    let filters = {}
    filters[parameter] = login
    filters["Password"] = password

    User.findOne(filters, function(err, user) {
      console.log(user)
      if (err) {
        return res.status(200).json({error: err.message});
      } else if (user) {
        id = user._id.valueOf();
        fn = user.FirstName;
        ln = user.LastName;
        try {
          const token = require("./createJWT.js");
          ret = {jwtToken: token.createToken(fn, ln, id)};
        } catch (e) {
          ret = { error: e.message };
        }
      } else {
        ret = { error: "Incorrect credentials", id: id };
      }
      res.status(200).json(ret);
    });
  });

  app.post("/api/add-service", async (req, res, next) => {
    // incoming: userId, title, longitude, latitude, description, price, daysAvailable, category, jwtToken
    // outgoing: serviceId, error (optional), jwtToken
    var response;

    let {
      userId,
      title,
      imageUrls,
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

    await Service.create(
      {
        UserId: userId,
        Title: title,
        Images: imageUrls,
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
            serviceId: objectInserted._id.valueOf(),
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
    // outgoing: error (optional), deletedServiceCount, jwtToken

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

    Service.deleteOne({ UserId: userId, Title: title }, function (err, result) {
        if (err) {
          response = {
            error: err,
            deletedServiceCount: result.deletedCount,
            refreshedToken: refreshedToken,
          };
        } else {
          console.log("Deleted " + result.deletedCount + " documents")
          response = {
            deletedServiceCount: result.deletedCount,
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
      } else if (objectReturned == null) {
        response = { error: "Wrong password", refreshedToken: refreshedToken };
      } else {
        response = {refreshedToken: refreshedToken };
      }
      console.log(objectReturned)
      res.status(200).json(response);
    });
  });

  // TODO: user can only leave one review for each service
  app.post("/api/add-review", async (req, res, next) => {
    // incoming: userId, serviceId, reviewer profile picture, ReviewText, jwtToken
    // outgoing: error (optional), jwtToken

    let {
      userId,
      serviceId,
      //reviewerProfilePic,
      reviewText,
      jwtToken,
    } = req.body;

    //check jwt
    try {
      if (token.isExpired(jwtToken)) {
        var r = { error: "The JWT is no longer valid", jwtToken: "" };
        res.status(200).json(r);
        return;
      }
    } catch (e) {
      console.log(e.message);
    }

    //refresh token
    var refreshedToken = null;
    try {
      refreshedToken = token.refresh(jwtToken);
    } catch (e) {
      console.log(e.message);
    }
              
    // send request
    const review = new Review({
      UserId: userId, 
      ServiceId: serviceId, 
      ReviewText: reviewText
    })

    await review.save({}, function(err) {
      if(err) {
        res.send({ error: err, RefreshedToken: refreshedToken })
      } else {
        res.send({ RefreshedToken: refreshedToken });
      }
    });

    console.log(review);
    
  });

  
  app.post("/api/delete-review", async (req, res, next) => {
    // incoming: reviewId (to delete single review), 
    //           userId (deletes all reviews associated with user),
    //           serviceId (deletes all reviews associated with service),
    //           NOTE: at least one parameter is needed to make it work
    // outgoing: deleteCount, jwtToken, error (optional)

    let {
      userId,
      reviewId,
      serviceId,
      jwtToken
    } = req.body;

    // check jwt
    try {
      if (token.isExpired(jwtToken)) {
        var r = { error: "The JWT is no longer valid", jwtToken: "" };
        res.status(200).json(r);
        return;
      }
    } catch (e) {
      console.log(e.message);
    }

    // refresh token
    var refreshedToken = null;
    try {
      refreshedToken = token.refresh(jwtToken);
    } catch (e) {
      console.log(e.message);
    }

    // find and delete review
    Review.deleteMany({
      $or: [
        {_id: reviewId},
        {UserId: userId},
        {ServiceId: serviceId}
      ]
    }, function (err, result) {
      if (err) {
        res.send({ error: err, RefreshedToken: refreshedToken });
      } else {
        res.send({ deletedCount: result.deletedCount, RefreshedToken: refreshedToken });
      }
    });
  });

  app.post("/api/store-image", cloudinaryParser.single("image"), async (req, res) => {
      res.status(200).json({ imageUrl: req.file.path })
  })


};
