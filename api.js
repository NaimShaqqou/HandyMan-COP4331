const { ObjectId } = require("mongodb");
const axios = require('axios');

// import schema
const User = require("./models/user.js");
const Review = require("./models/reviews.js");

//load card model
const Card = require("./models/card.js");
const Service = require("./models/services.js");
const { ObjectID } = require("bson");
const crypto = require('./crypto.js');
const { listeners } = require("./models/user.js");

require("express");
require("mongodb");
require("dotenv")

exports.setApp = function (app, client, cloudinaryParser) {
 

  let url;
  if (process.env.NODE_ENV === 'production') 
  {
    url='https://myhandyman1.herokuapp.com/';
  } else {
    url = 'http://localhost:5000/' 
  }


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
    // outgoing: error

    var error = "";
    var ret;

    const { email, password, firstName, lastName, username } = req.body;

    const newUser = { FirstName: firstName, LastName: lastName, Username: username, Password: password, Email: email };
    // var id = -1;
    // return id?

    // try {
    //   const db = await client.db();
    //   const result = await db.collection("Users").insertOne(newUser);
    //   //const result = await User.insertOne(newUser);
    // } catch (e) {
    //   ret = { error: e.message };
    // }

    // res.status(200).json(ret);

    const db = client.db();
    const result = await db.collection("Users").insertOne(
      {
        FirstName: firstName, 
        LastName: lastName, 
        Username: username, 
        Password: password, 
        Email: email
      },
      function (err, objectInserted) {
        if (err) {
          response = {
            error: err,
          };
        } else {
          response = {
            error: err
          };
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

  // NOTE: Can't test this endpoint on local machine due to Google Api endpoint
  app.post("/api/add-service", async (req, res, next) => {
    // incoming: userId, title, address, description, price, daysAvailable, category, jwtToken
    // outgoing: serviceId, error, jwtToken
    var response;

    let {
      userId,
      title,
      imageUrls,
      address,
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

    let coordinates = await convertAddressToCoordinates(address)

    userId = ObjectId(userId)

    await Service.create(
      {
        UserId: userId,
        Title: title,
        Images: imageUrls,
        Address: address,
        Longitude: coordinates.lng.toString(),
        Latitude: coordinates.lat.toString(),
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

  app.post("/api/forgot-password-email", async (req, res, next) => {
    let email = req.body.email
    encryptedEmail = crypto.encrypt_string(email)
    
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: email, 
      from: 'emailverifysendgrid@gmail.com', 
      subject: 'Change HandyMan account password',
      html: '<strong>Click this link to change your password: </strong><a href=' + url + 'api/forgot-password-page?email=' + encryptedEmail +' >Change password</>',
    }
    sgMail
    .send(msg)
    .then(() => {
      res.status(200).json("Email sent")
    })
    .catch((error) => {
      res.status(200).json(error)
    })
  })

  // Sends email to verify their account
  function verifyEmail(email, userId) {

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

  // Helper function for getDistance()
  var rad = function(x) {
    return x * Math.PI / 180;
  };
  
  // Finds distance in meters between two coordinates. Uses Haversine formula
  function getDistance(lat1, long1, lat2, long2) {
    var R = 6378137; // Earth’s mean radius in meter
    var latitudeDistance = rad(lat2 - lat1);
    var longitudeDistance = rad(long2 - long1);
    var a = Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
      Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
      Math.sin(longitudeDistance / 2) * Math.sin(longitudeDistance / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c;
    return distance; 
  };

  // Returns services that are within maxDistance. (Assumes maxDistance is in miles)
  function getServicesWithinDistance(services, location, maxDistance) {
    let filteredServices = new Array();
    maxDistanceInMeters = maxDistance * 1609.34

    services.forEach((service) => {
      let distance = getDistance(service.Latitude, service.Longitude, location.latitude, location.longitude)
      if (distance <= maxDistanceInMeters) {
        filteredServices.push(service)
      }
    })

    return filteredServices;
  }

  // Returns coordinates = { lat, lng }
  async function convertAddressToCoordinates(address) {
    let googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="
    let apiKey = process.env.GEOCODING_API_KEY
    address = address.replace(' ', '+')

    googleUrl = googleUrl +_address + '&key=' + apiKey;
    let coordinates;

    await axios(googleUrl)
      .then((response) => {
        let result = JSON.parse(response)
        coordinates = result.geometry.location
        console.log(coordinates);
      })
      .catch((error) => {
        console.log(error);
      });
    return coordinates;
  }

//------------- These endpoints won't be called by the frontend. --------------------

  app.post("/api/forgot-password", async (req, res, next) => {
    let encryptedEmail = req.body.email
    let email = crypto.decrypt_string(encryptedEmail);
    let password = req.body.password;


    User.findOneAndUpdate({ Email: email }, { Password: password }, function(err, objectReturned) {
      if (objectReturned) {
        res.status(200).sendFile('backendHtml/forgotPasswordSuccess.html' , { root : __dirname})
      } else {
        res.status(200).sendFile('backendHtml/forgotPasswordFail.html', { root : __dirname})
      }
    });
  })

  app.get("/api/forgot-password-page", async (req, res, next) => {
    if (url === 'https://myhandyman1.herokuapp.com/') {
      res.status(200).sendFile('backendHtml/forgotPasswordEmail.html' , { root : __dirname})
    } else {
      res.status(200).sendFile('backendHtml/forgotPasswordEmailDev.html' , { root : __dirname})
    }
  })

  app.get("/api/verify-email", async (req, res, next) => {
    let id;

    try {
      id = ObjectId(req.query.verifycode)
    } catch (e) {
      res.status(200).sendFile('backendHtml/failedVerifyEmail.html', { root : __dirname})
      return;
    }

    User.findByIdAndUpdate(id, {Verified: true}, function(err, response) {
      if (response) {
        res.status(200).sendFile('backendHtml/successfullVerifyEmail.html' , { root : __dirname})
      } else {
        res.status(200).sendFile('backendHtml/failedVerifyEmail.html', { root : __dirname})
      }
    })
  })


};
