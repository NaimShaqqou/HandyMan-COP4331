import {PolyUtil} from "node-geometry-library";

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
    // outgoing: userId, error

    const { email, password, firstName, lastName, username } = req.body;

    // duplicate username/email

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
          ret = { error: "", jwtToken: token.createToken(fn, ln, id)};
        } catch (e) {
          ret = { error: e.message, jwtToken: ""};
        }
      } else {
        ret = { error: "Incorrect credentials", jwtToken: ""};
      }
      res.status(200).json(ret);
    });
  });

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
        Longitude: coordinates.location.lng.toString(),
        Latitude: coordinates.location.lat.toString(),
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
            error: ""
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
            error: ""
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
        response = {refreshedToken: refreshedToken, error: ""};
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

    User.findOne({Email: email}, function(err, user) {
      if (err) {
        return res.status(200).json({error: err.message, success: ""});
      } else if (user) {
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
          return res.status(200).json({ success: "Email sent", error: "" })
        })
        .catch((error) => {
          return res.status(200).json({error : error.message, success: ""})
        })
      } else {
        return res.status(200).json({error : "Email is not associated with an account.", success: ""})
      }
    });
  })

  app.post("/api/autocomplete-place", async (req, res, next) => {
    let input = req.body.input
    let googleUrl = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="
    let apiKey = process.env.PLACES_API_KEY
    let predictions = new Array()

    input = input.replaceAll(' ', '+')
    googleUrl = googleUrl + input + "&components=country:us&types=(regions)&key=" + apiKey

    await axios(googleUrl)
      .then((response) => {
        let result = response.data.predictions
        result.forEach((place) => {
          predictions.push(place.description)
        })
        console.log(predictions)
        res.status(200).json({predictions: predictions, error: ""})
      })
      .catch((error) => {
        console.log(error);
        res.status(200).json({ error: error.message, predictions: predictions})
      });
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

  // Returns services that are within maxDistance. (Assumes maxDistance is in miles). 
  function getServicesWithinDistance(services, location, maxDistance) {
    let filteredServices = new Array();
    maxDistanceInMeters = maxDistance * 1609.34

    locationInfo = convertAddressToCoordinates(location)

    if (!location.types.includes("street_address")) {
      polygonCoords = createPolygonCoordinates(locationInfo.viewport)
      console.log(polygonCoords)

      services.forEach((service) => {
        if (PolyUtil.containsLocation({lat: parseFloat(service.Latitude), lng: parseFloat(service.Longitude)}, polygonCoords)) {
          filteredServices.push(service)
        } else {
          let distance = maxDistanceInMeters.toString()
          let digits = distance.split('.')
          let numOfDigitsBeforeDecimal = digits[0].length
          let power = 6 - numOfDigitsBeforeDecimal
          let num = "1e-" + power 

          if(PolyUtil.isLocationOnEdge({lat: parseFloat(service.Latitude), lng: parseFloat(service.Longitude)}, polygonCoords, parseFloat(num))) {
            filteredServices.push(service)
          }
        }
      })
    } else {
      services.forEach((service) => {
        let distance = getDistance(parseFloat(service.Latitude), parseFloat(service.Longitude), locationInfo.location.lat, locationInfo.location.lng)
        if (distance <= maxDistanceInMeters) {
          filteredServices.push(service)
        }
      })
    }
    return filteredServices;
  }

  function createPolygonCoordinates(coordinates) {
    let lat1 = parseFloat(coordinates.northeast.lat)
    let lng1 = parseFloat(coordinates.northeast.lng)
    let lat2 = parseFloat(coordinates.southwest.lat)
    let lng2 = parseFloat(coordinates.southwest.lng)

    let centerLong = (lng1 + lng2)/2
    let centerLat = (lat1 + lat2)/2
    let halfDiagonalLong = (lng1 - lng2)/2
    let halfDiagonalLat = (lat1 - lat2)/2

    let corner1 = {lat: centerLat - halfDiagonalLong, lng: centerLong - halfDiagonalLat}
    let corner2 = {lat: centerLat + halfDiagonalLong, lng: centerLong + halfDiagonalLat}
    let corner3 = {lat: lat1, lng: lng1}
    let corner4 = {lat: lat2, lng: lng2}

    return(new Array(corner1, corner2, corner3, corner4))
  }

  async function convertAddressToCoordinates(address) {
    let googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="
    let apiKey = process.env.GEOCODING_API_KEY
    address = address.replaceAll(' ', '+')
    googleUrl = googleUrl + address + '&key=' + apiKey;
    let coordinates;

    await axios(googleUrl)
      .then((response) => {
        let result = response.data.results[0]
        coordinates = { location: result.geometry.location, viewport: result.geometry.viewport, type: result.types } 
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
