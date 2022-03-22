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

  app.post("/api/search-services", async (req, res, next) => {
    // incoming: search, jwtToken
    // outgoing: results[], error

    var error = "";

    const { search, jwtToken } = req.body;
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

    // Looks through the different fields of a service using the specified given search
    const results = await Service.find({
      $or: [
        { Title: _search },
        { Description: _search },
        { Category: _search }
      ]
    });

    var _ret = [];
    for (var i = 0; i < results.length; i++) {
      _ret.push(results[i].Service);
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

  app.post("/api/register", async (req, res, next) => {
    // incoming: email, password, firstName, lastName, username
    // outgoing: userId, error

    const { email, password, firstName, lastName, username } = req.body;

    const result = User.create(
      {
        FirstName: firstName, 
        LastName: lastName, 
        Username: username, 
        Password: password, 
        Email: email,
        Verified: false
      },
      function (err, user) {
        if (err) {
          response = {
            id : "-1",
            error: err.message
          };
        } else {
          response = {
            id : user._id.valueOf(),
            error: "Successfully added user!"
          };
          //verifyEmail(email, user._id.valueOf());
        }
        res.status(200).json(response);
      }
    );
  });

  app.post("/api/login", async (req, res, next) => {
    // incoming: login, password
    // outgoing: jwtToken, error

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

        if (!user.Verified) {
          res.status(200).json({ error: "Please verify your email by clicking the email we sent you." })
          return;
        }

        try {
          const token = require("./createJWT.js");
          ret = { error: null, jwtToken: token.createToken(fn, ln, id)};
        } catch (e) {
          ret = { error: e.message };
        }
      } else {
        ret = { error: "Incorrect credentials" };
      }
      res.status(200).json(ret);
    });
  });

  app.post("/api/add-service", async (req, res, next) => {
    // incoming: userId, title, longitude, latitude, description, price, daysAvailable, category, jwtToken
    // outgoing: serviceId, error, jwtToken
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
            error: err.message,
            refreshedToken: refreshedToken,
          };
        } else {
          response = {
            serviceId: objectInserted._id.valueOf(),
            refreshedToken: refreshedToken,
            error: null
          };
        }
        console.log(objectInserted)
        res.status(200).json(response);
      }
    );

    
  });

  app.post("/api/delete-service", async (req, res, next) => {
    // incoming: userId, title, jwtToken
    // outgoing: error, deletedServiceCount, jwtToken

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
            error: err.message,
            deletedServiceCount: result.deletedCount,
            refreshedToken: refreshedToken,
          };
        } else {
          console.log("Deleted " + result.deletedCount + " documents")
          response = {
            deletedServiceCount: result.deletedCount,
            refreshedToken: refreshedToken,
            error: null
          };
        }
        res.status(200).json(response);
      });
  });

  app.post("/api/change-password", async (req, res, next) => {
    // incoming: userId, oldPassword, newPassword, jwtToken
    // outgoing: error, jwtToken

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
        response = { error: err.message, refreshedToken: refreshedToken };
      } else if (objectReturned == null) {
        response = { error: "Wrong password", refreshedToken: refreshedToken };
      } else {
        response = {refreshedToken: refreshedToken, error: null};
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

  app.get("/api/verify-email", async (req, res, next) => {
      let id = req.body.verifycode
      User.findByIdAndUpdate(id, {Verified: true}, function(err, response) {
        if (response) {
          res.status(200).json({ response: "Your account has been verified, please login."})
        } else {
          res.status(200).json({ resposne: "Your account has not been verified"})
        }
      })
  })

  function verifyEmail(email, userId) {
    let url;
    if (process.env.NODE_ENV === 'production') 
    {
      url='https://myhandyman1.herokuapp.com/';
    } else {
      url = 'http://localhost:5000/' 
    }
    
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: email, 
      from: 'emailverifysendgrid@gmail.com', 
      subject: 'Verify your HandyMan account',
      html: '<strong>Click this link to verify your email: </strong><a href=' + url + 'api/verify-email?verifycode=' + userId +' >Verify my account</>',
    }
    sgMail
    .send(msg)
    .then(() => {
      return(rand)
    })
    .catch((error) => {
      return(error)
    })
  }


};
