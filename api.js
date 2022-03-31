const {PolyUtil, SphericalUtil} = require("node-geometry-library");

const { ObjectId } = require("mongodb");
const axios = require('axios');

// import schema
const User = require("./models/user.js");
const Review = require("./models/reviews.js");
const RequestedService = require("./models/requestedservices.js");

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
    url='https://myhandyman1.herokuapp.com';
  } else {
    url = 'http://localhost:5000' 
  }


  var token = require("./createJWT.js");

  app.post("/api/search-services", async (req, res, next) => {
    // incoming: search, location, maxDist, jwtToken
    // outgoing: results[], error

    var error = "";
    const { search, location, maxDist, jwtToken } = req.body;

    var _search = search.trim();
    console.log(_search);

    // Checks if token is expired
    try {
      if (token.isExpired(jwtToken)) {
        var r = { error: "The JWT is no longer valid", jwtToken: "" };
        res.status(200).json(r);
        return;
      }
    } catch (e) {
      console.log(e.message);
    }

    // Generates a new token
    var refreshedToken = null;
    try {
      refreshedToken = token.refresh(jwtToken);
    } catch (e) {
      console.log(e.message);
    }

    // Looks through the different fields of a service using the specified given search
    try {
      var services = await Service.find({
        $or: [
          { Title : { "$regex" : _search, "$options" : "i" } },
          { Description : { "$regex" : _search, "$options" : "i" } },
          { Category : { "$regex" : _search, "$options" : "i" } }
        ]});

        // Filters services based on distance
        if (services.length > 0)
          services = getServicesWithinDistance(services, convertAddressToCoordinates(location), maxDist);

        response = { results: services, error: error, jwtToken: refreshedToken };
        res.status(200).json(response);
    }
    // If we have problems, we end up here
    catch (err)
    {
      response = { error: err.message, refreshedToken: refreshedToken };
      res.status(200).json(response);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    // incoming: email, password, firstName, lastName, username
    // outgoing: userId, error

    const { email, password, firstName, lastName, username } = req.body;
    let valid = true;

    // duplicate username/email
    await User.findOne({Username : username}).then((user)=>{
      if (user != null)
      {
        valid = false;
        return res.status(200).json({ id: "-1", error: "Username already exists. Please enter a different username." });
      }
    }).catch(err=>{
      return res.status(200).json({ id: "-1", error: err.message});
    }) 

    if (valid){
      await User.findOne({Email : email}).then((user)=>{
        if (user != null)
        {
          valid = false;
          return res.status(200).json({ id: "-1", error: "Email already exists. Please enter a different email." });
        }
      }).catch(err=>{
        return res.status(200).json({ id: "-1", error: err.message});
      }) 
    }
   
    if (valid)
    {
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
              id: "-1",
              error: err.message
            };
          } else {
            response = {
              id: user._id.valueOf(),
              error: ""
            };
            verifyEmail(email, user._id.valueOf());
          }
          res.status(200).json(response);
        }
      );
    } 
  });

  app.post("/api/login", async (req, res, next) => {
    // incoming: login, password

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

    await User.findOne(filters).then(async (user) => {
        if (user != null) {
          id = user._id.valueOf();
          fn = user.FirstName;
          ln = user.LastName;
  
          if (!user.Verified) {
            res.status(200).json({ error: "Account has not been verified!" , firstName: "", lastName: "", profileDescription: "", profilePicture: "", userId: "", jwtToken: "", services: new Array()})
            return;
          }
  
          try {
            const token = require("./createJWT.js");
            let services = await Service.find({ UserId: id} ).exec()

            ret = { error: "", firstName: fn, lastName: ln, profileDescription: user.ProfileDescription, profilePicture: user.ProfilePicture, userId: id, jwtToken: token.createToken(fn, ln, id), services: services};
          } catch (e) {
            ret = { error: e.message, jwtToken: "", firstName: "", lastName: "", profileDescription: "", profilePicture: "", userId: "", services: new Array()};
          }
        } else {
          ret = { error: "Incorrect credentials", firstName: "", lastName: "", profileDescription: "", profilePicture: "", userId: "", jwtToken: "", services: new Array()};
        }
        res.status(200).json(ret);
    }).catch((e) => ret = { error: e.message, firstName: "", lastName: "", profileDescription: "", profilePicture: "", userId: "", jwtToken: "", services: new Array()}) 
  });

  app.post("/api/edit-profile", async (req, res, next) => {
    // incoming: userId, newFirstName, newLastName, newProfileDescription, newProfilePicture, jwtToken
    // outgoing: userId, error, jwtToken
    var response;

    let {
      userId,
      newFirstName, 
      newLastName, 
      newProfileDescription, 
      newProfilePicture,
      jwtToken
    } = req.body;

    let update = {
      UserId: userId,
      FirstName: newFirstName, 
      LastName: newLastName, 
      ProfileDescription: newProfileDescription, 
      ProfilePicture: newProfilePicture 
    }

    userId = ObjectId(userId);

    try {
      if (token.isExpired(jwtToken)) {
        var r = { userId: -1, error: "The JWT is no longer valid", jwtToken: "" };
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

    User.findOneAndUpdate({_id: userId}, update, 
      function(err, user) {
      if (err) {
        response = { userId: -1, error: err.message, refreshedToken: refreshedToken };
      } else if (user == null) {
        response = { userId: -1, error: "Incorrect information", refreshedToken: refreshedToken };
      } else {
        response = { UserId: user._id.valueOf(), error: "", refreshedToken: refreshedToken};
      }
      res.status(200).json(response);
    });
  });

  app.post("/api/edit-service", async (req, res, next) => {
    // incoming: userId, oldTitle, oldAddress, oldDescription, oldPrice, oldDaysAvailable, oldCategory, 
    // newTitle, newImages, newAddress, newDescription, newPrice, newDaysAvailable, newCategoryjwtToken
    // outgoing: serviceId, error, jwtToken
    var response;

    let {
      userId,
      oldTitle, 
      oldAddress, 
      oldDescription, 
      oldPrice, 
      oldDaysAvailable, 
      oldCategory,
      newTitle, 
      newImages,
      newAddress, 
      newDescription, 
      newPrice, 
      newDaysAvailable, 
      newCategory,
      jwtToken
    } = req.body;

    let filter = {
      UserId: userId,
      Title: oldTitle, 
      Address: oldAddress,
      Description: oldDescription, 
      Price: oldPrice, 
      DaysAvailable: oldDaysAvailable, 
      Category: oldCategory
    }

    let coordinates = await convertAddressToCoordinates(newAddress);
    userId = ObjectId(userId);

    let update = {
      Title: newTitle, 
      Address: newAddress, 
      Images: newImages,
      Longitude: coordinates.location.lng.toString(),
      Latitude: coordinates.location.lat.toString(),
      Description: newDescription, 
      Price: newPrice, 
      DaysAvailable: newDaysAvailable, 
      Category: newCategory
    }

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

    Service.findOneAndUpdate(filter, update, 
      function(err, service) {
      if (err) {
        response = { error: err.message, refreshedToken: refreshedToken };
      } else if (service == null) {
        response = { error: "Incorrect information", refreshedToken: refreshedToken };
      } else {
        response = { ServiceId: service._id.valueOf(), error: "", refreshedToken: refreshedToken};
      }
      res.status(200).json(response);
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

    Service.findOneAndDelete({ UserId: userId, Title: title }, function (err, result) {
        if (err) {
          response = {
            error: err.message,
            refreshedToken: refreshedToken
          };
        } else {
          if (result == null) {
            response = {
              refreshedToken: refreshedToken,
              error: "Couldn't delete service."
            };
          } else {
            response = {
              refreshedToken: refreshedToken,
              error: ""
            };

            // Delete reviews associated with service
            axios.post(url + '/api/delete-review', {
              serviceId: result._id,
              jwtToken: refreshedToken
            })
          }
        }
        
        res.status(200).json(response);
      });
  });

  app.post("/api/request-service", async (req, res, next) => {
    // incoming: requesterId, serviceId, price, date, description, jwtToken
    // outgoing: requestedServiceId, error, jwtToken
    var response;
    let {
      requesterId, 
      serviceId, 
      price, 
      date, 
      description,
      jwtToken,
    } = req.body;

    let request = {
      RequesterId: requesterId, 
      ServiceId: serviceId, 
      Completion: false,
      Price: price, 
      Dates: date,
      DescriptionFromRequester: description
    } 

    try {
      if (token.isExpired(jwtToken)) {
        var r = { requestedServiceId: -1, error: "The JWT is no longer valid", jwtToken: "" };
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

    await RequestedService.create(request,
      function (err, objectInserted) {
        if (err) {
          response = {
            requestedServiceId: -1,
            error: err.message,
            refreshedToken: refreshedToken,
          };
        } else {
          response = {
            requestedServiceId: objectInserted._id.valueOf(),
            refreshedToken: refreshedToken,
            error: ""
          };
        }
        console.log(objectInserted)
        res.status(200).json(response);
      }
    );
  });

  app.post("/api/requested-service-history", async (req, res, next) => {
    // incoming: serviceId, jwtToken
    // outgoing: results[], error, jwtToken
  
    const { serviceId, jwtToken } = req.body;

    try {
      if (token.isExpired(jwtToken)) {
        var r = { results: null, error: "The JWT is no longer valid", jwtToken: "" };
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

    const results = await RequestedService.find({ ServiceId : serviceId });

    var ret;
    if (results.length == 0)
      ret = { results: null, error: "No requested services found", refreshedToken: refreshedToken };
    else
      ret = { results: results, error: "", refreshedToken: refreshedToken }; 

    res.status(200).json(ret);
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
      reviewerProfilePic,
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
      ProfilePictureOfReviewer: reviewerProfilePic,
      ServiceId: serviceId, 
      ReviewText: reviewText
    })

    await review.save({}, function(err, objectInserted) {
      if(err) {
        res.send({ reviewId: -1, error: err, RefreshedToken: refreshedToken })
      } else {
        res.send({ reviewId: objectInserted._id.valueOf(), error: "", RefreshedToken: refreshedToken });
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
        res.send({ error: "", deletedCount: result.deletedCount, RefreshedToken: refreshedToken });
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
          html: '<strong>Click this link to change your password: </strong><a href=' + url + '/api/forgot-password-page?email=' + encryptedEmail +' >Change password</>',
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
      html: '<strong>Click this link to verify your email: </strong><a href=' + url + '/api/verify-email?verifycode=' + userId +' >Verify my account</>',
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

  // Returns services that are within maxDistance. (Assumes maxDistance is in miles). 
  async function getServicesWithinDistance(services, location, maxDistance) {
    maxDistance = maxDistance == 0 ? 1 : maxDistance;
    let filteredServices = new Array();
    let maxDistanceInMeters = maxDistance * 1609.34

    locationInfo = await convertAddressToCoordinates(location)
    console.log(locationInfo)
    polygonCoords = createPolygonCoordinates(locationInfo.viewport)
    console.log(polygonCoords)

    services.forEach((service) => {
      let distance = SphericalUtil.computeDistanceBetween({lat: parseFloat(service.Latitude) , lng: parseFloat(service.Longitude)}, {lat: locationInfo.location.lat, lng: locationInfo.location.lng})
      if (distance <= maxDistanceInMeters) {
        filteredServices.push(service)
      } else if (PolyUtil.containsLocation({lat: parseFloat(service.Latitude), lng: parseFloat(service.Longitude)}, polygonCoords)) {
        // Check if service is inside location
        filteredServices.push(service)
      } else {
        let num = maxDistanceInMeters * 1e-5
        // Check if service is close enough to location
        if(PolyUtil.isLocationOnEdge({lat: parseFloat(service.Latitude), lng: parseFloat(service.Longitude)}, polygonCoords, num)) {
          filteredServices.push(service)
        }
      }
    })
    
    return ({filteredServices: filteredServices, searchLocationCoords: { lat: locationInfo.location.lat, lng: locationInfo.location.lng}})
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

    let corner1 = {lat: centerLat + halfDiagonalLong, lng: centerLong - halfDiagonalLat}
    let corner2 = {lat: centerLat - halfDiagonalLong, lng: centerLong + halfDiagonalLat}
    let corner3 = {lat: lat1, lng: lng1}
    let corner4 = {lat: lat2, lng: lng2}

    return(new Array(corner2, corner4, corner1, corner3))
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
