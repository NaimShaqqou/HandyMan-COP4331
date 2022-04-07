const express = require("express"); // middleware
const bodyParser = require("body-parser"); // to parse json

require("dotenv").config();

const request = require('supertest')

const path = require("path");
const PORT = process.env.PORT || 5000;

var multer = require('multer');
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");

// Account access information
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Uploading Image Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    public_id: (req, file) => file.filename
  }
});
const parser = multer({ storage: storage });

const app = express();
app.use(bodyParser.json());


app.set("port", process.env.PORT || 5000);

const url = process.env.MONGODB_URI;
const mongoose = require("mongoose");
mongoose.connect(url)
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log(err));


var api = require('./api.js')
api.setApp( app, mongoose , parser );




describe("POST /login", () => {

    describe("Logs in valid users using username or email", () => {

        test("Logs in with username", async () => {
            const actualUsers = [
                {
                    login: "naim2",
                    password: "test"
                },
                {
                    login: "KX",
                    password: "1"
                },
                {
                    login: "user33",
                    password: "1234"
                }
            ]
            const expectedId = ["624e8868c55342be9aa3bb79", "6249d4dd209ec872ed42da6b", "6249b71daf1d6cad242481c3"];

            let i = 0
            for (const user of actualUsers) {
                await request(app).post("/api/login").send({login: user.login, password: user.password}).expect((res) => {
                    expect(res.body.userId).toBe(expectedId[i])
                    i++
                })
            }
        })

        test("Logs in with email", async () => {
            const actualUsers = [
                {
                    login: "blueflugames@gmail.com",
                    password: "test"
                },
                {
                    login: "zxu0416@knights.ucf.edu",
                    password: "1"
                },
                {
                    login: "user33@gmail.com",
                    password: "1234"
                }
            ]
            const expectedId = ["624e8868c55342be9aa3bb79", "6249d4dd209ec872ed42da6b", "6249b71daf1d6cad242481c3"];

            let i = 0
            for (const user of actualUsers) {
                await request(app).post("/api/login").send({login: user.login, password: user.password}).expect((res) => {
                    expect(res.body.userId).toBe(expectedId[i])
                    i++
                })
            }
        })

    })

    describe("Rejects users with unverified accounts", () => {
        test("Users are unverified", async () => {
            const actualUsers = [
                {
                    login: "daviss",
                    password: "davidj"
                },
                {
                    login: "ab",
                    password: "1234"
                },
                {
                    login: "test3",
                    password: "1234"
                }
            ]
            const expectedId = ["624e8868c55342be9aa3bb79", "6249d4dd209ec872ed42da6b", "6249b71daf1d6cad242481c3"];

            let i = 0
            for (const user of actualUsers) {
                await request(app).post("/api/login").send({login: user.login, password: user.password}).expect((res) => {
                    expect(res.body.error).toBe("Account has not been verified!")
                    i++
                })
            }
        })
    })

    describe("Rejects wrong credentials", () => {
        test("Wrong password" , async () => {
            const actualUsers = [
                {
                    login: "naim2",
                    password: "wefgwefwef"
                },
                {
                    login: "KX",
                    password: "wefwefwef"
                },
                {
                    login: "user33",
                    password: "wefwefwefwef"
                }
            ]
            const expectedId = ["624e8868c55342be9aa3bb79", "6249d4dd209ec872ed42da6b", "6249b71daf1d6cad242481c3"];

            let i = 0
            for (const user of actualUsers) {
                await request(app).post("/api/login").send({login: user.login, password: user.password}).expect((res) => {
                    expect(res.body.error).toBe("Incorrect credentials")
                    i++
                })
            }
        })

        test("Wrong email", async () => {
            const actualUsers = [
                {
                    login: "fewjkn@efdnesaf",
                    password: "test"
                },
                {
                    login: "fksedhfik@lefnlwejf",
                    password: "1"
                },
                {
                    login: "jasfolf@eoifje",
                    password: "1234"
                }
            ]
            const expectedId = ["624e8868c55342be9aa3bb79", "6249d4dd209ec872ed42da6b", "6249b71daf1d6cad242481c3"];

            let i = 0
            for (const user of actualUsers) {
                await request(app).post("/api/login").send({login: user.login, password: user.password}).expect((res) => {
                    expect(res.body.error).toBe("Incorrect credentials")
                    i++
                })
            }
        })

        test("Wrong username", async () => {
            const actualUsers = [
                {
                    login: "fewjkn",
                    password: "test"
                },
                {
                    login: "fksedhfik",
                    password: "1"
                },
                {
                    login: "jasfolf",
                    password: "1234"
                }
            ]
            const expectedId = ["624e8868c55342be9aa3bb79", "6249d4dd209ec872ed42da6b", "6249b71daf1d6cad242481c3"];

            let i = 0
            for (const user of actualUsers) {
                await request(app).post("/api/login").send({login: user.login, password: user.password}).expect((res) => {
                    expect(res.body.error).toBe("Incorrect credentials")
                    i++
                })
            }
        })

        test("Both credentials are wrong", async () => {
            const actualUsers = [
                {
                    login: "wefwefwef",
                    password: "wefwef"
                },
                {
                    login: "segfwserg",
                    password: "sdfvserg"
                },
                {
                    login: "awfsrgb",
                    password: "awfawef"
                }
            ]
            const expectedId = ["624e8868c55342be9aa3bb79", "6249d4dd209ec872ed42da6b", "6249b71daf1d6cad242481c3"];

            let i = 0
            for (const user of actualUsers) {
                await request(app).post("/api/login").send({login: user.login, password: user.password}).expect((res) => {
                    expect(res.body.error).toBe("Incorrect credentials")
                    i++
                })
            }
        })
    })

})