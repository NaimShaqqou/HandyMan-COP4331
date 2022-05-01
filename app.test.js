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


const testJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjM0YzRkMzlhMDUwYTM2NTU1YTY5NDIiLCJmaXJzdE5hbWUiOiJFc3RlYmFuIiwibGFzdE5hbWUiOiJCcnVnYWwiLCJpYXQiOjE2NDgxNjM2MzR9.Zq_Qzyfvayih54ggotiV1DYRCFlk8EV_ApaS1d3iDNg"

describe("POST /login", () => {

    describe("Logs in valid users using username or email", () => {

        test("Logs in with email", async () => {
            const actualUsers = [
                {
                    login: "email@emails",
                    password: "jesttest1"
                },
                {
                    login: "email@email",
                    password: "jesttest2"
                },
                {
                    login: "emails@email",
                    password: "jesttest3"
                }
            ]
            const expectedId = ["625b7bef027f784940085b44", "625b7c6d027f784940085b45", "625b7ca5027f784940085b46"];

            let i = 0
            for (const user of actualUsers) {
                await request(app).post("/api/login").send({login: user.login, password: user.password}).expect((res) => {
                    expect(res.body.userId).toBe(expectedId[i])
                    i++
                })
            }
        })

        test("Logs in with username", async () => {
            const actualUsers = [
                {
                    login: "jesttest1",
                    password: "jesttest1"
                },
                {
                    login: "jesttest2",
                    password: "jesttest2"
                },
                {
                    login: "jesttest3",
                    password: "jesttest3"
                }
            ]
            const expectedId = ["625b7bef027f784940085b44", "625b7c6d027f784940085b45", "625b7ca5027f784940085b46"];

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
            const expectedId = ["625b7bef027f784940085b44", "625b7c6d027f784940085b45", "625b7ca5027f784940085b46"];

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
                    login: "jesttest1",
                    password: "jesttest2"
                },
                {
                    login: "jesttest2",
                    password: "jesttest1"
                },
                {
                    login: "jesttest3",
                    password: "jesttest1"
                }
            ]
            const expectedId = ["625b7bef027f784940085b44", "625b7c6d027f784940085b45", "625b7ca5027f784940085b46"];

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
                    login: "email@email",
                    password: "jesttest1"
                },
                {
                    login: "email@emails",
                    password: "jesttest2"
                },
                {
                    login: "emails@emails",
                    password: "jesttest3"
                }
            ]
            const expectedId = ["625b7bef027f784940085b44", "625b7c6d027f784940085b45", "625b7ca5027f784940085b46"];

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
                    login: "jesttest",
                    password: "jesttest1"
                },
                {
                    login: "jesttet2",
                    password: "jesttest2"
                },
                {
                    login: "jesttest2",
                    password: "jesttest3"
                }
            ]
            const expectedId = ["625b7bef027f784940085b44", "625b7c6d027f784940085b45", "625b7ca5027f784940085b46"];

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
                    login: "JestTest1",
                    password: "JestTest1"
                },
                {
                    login: "JestTest2",
                    password: "JestTest2"
                },
                {
                    login: "JestTest3",
                    password: "JestTest3"
                }
            ]
            const expectedId = ["625b7bef027f784940085b44", "625b7c6d027f784940085b45", "625b7ca5027f784940085b46"];

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


describe("POST /register", () => { 
    let deleteUserId;

    describe("Succesfully registers a user", () => {

        test("Registers user", async () => {
            const newUser = {
                email: "jesttestregister@gmail.com",
                password: "test",
                firstName: "jest",
                lastName: "test",
                username: "jesttestregister"
            }

            await request(app).post("/api/register").send( newUser ).expect((res) => {
                expect(res.body.id).not.toBe("-1")
                deleteUserId = res.body.id
            })
        })

    })

    describe("Fails to register user", () => {

        test("Fails because username is taken", async () => {
            const newUser = {
                email: "jesttestregisterusernametaken@gmail.com",
                password: "test",
                firstName: "jest",
                lastName: "test",
                username: "jesttestregister"
            }

            await request(app).post("/api/register").send( newUser ).expect((res) => {
                expect(res.body.id).toBe("-1")
            })
        })

        test("Fails because email is taken", async () => {
            const newUser = {
                email: "jesttestregister@gmail.com",
                password: "test",
                firstName: "jest",
                lastName: "test",
                username: "jesttestregisteremailtaken"
            }
        
            await request(app).post("/api/register").send( newUser ).expect((res) => {
                expect(res.body.id).toBe("-1")
            })

            // Cleanup by deleting user that was created
            await request(app).post("/api/cleanupRegisterTest").send( { userId: deleteUserId } ).expect((res) => {
                expect(res.body.response).toBe("Deleted user")
            })
            
        })
    })

})

describe("POST /change-password", () => { 

    describe("Successfully changes password", () => {
        test("Changes password", async () => {
            const payload = {
                userId: "625b7bef027f784940085b44",
                oldPassword: "jesttest1",
                newPassword: "newTestPassword",
                jwtToken: testJwtToken
            }

            await request(app).post("/api/change-password").send( payload ).expect((res) => {
                expect(res.body.error).toBe("")
            })
        })

    })

    describe("Fails to change password", () => {
        test("Fail because passwords are the same", async () => {
            const payload = {
                userId: "625b7bef027f784940085b44",
                oldPassword: "newTestPassword",
                newPassword: "newTestPassword",
                jwtToken: testJwtToken
            }

            await request(app).post("/api/change-password").send( payload ).expect((res) => {
                expect(res.body.error).toBe("Passwords can't be the same")
            })
        })

        test("Fail because old password is wrong", async () => {
            const payload = {
                userId: "625b7bef027f784940085b44",
                oldPassword: "jesttest2",
                newPassword: "newTestPassword",
                jwtToken: testJwtToken
            }

            await request(app).post("/api/change-password").send( payload ).expect((res) => {
                expect(res.body.error).toBe("Wrong password")
            })
        })
    })

    describe("Successfully change password back", () => {
        test("Changes password", async () => {
            const payload = {
                userId: "625b7bef027f784940085b44",
                oldPassword: "newTestPassword",
                newPassword: "jesttest1",
                jwtToken: testJwtToken
            }

            await request(app).post("/api/change-password").send( payload ).expect((res) => {
                expect(res.body.error).toBe("")
            })
        })

    })

})

let createdService;

describe("POST /add-service", () => { 
    describe("Creates new service", () => {
        test("Created service", async () => {
            const payload = {
                userId: "625b7bef027f784940085b44",
                title: "TESTING",
                imageUrls: [ "https://res.cloudinary.com/dt7uj6vfp/image/upload/v1650606134/images/kli8ahfh70ugfruswy3f.jpg" ],
                address: "Orlando, Fl",
                description: "TESTING",
                price: "1",
                daysAvailable: ["Monday"],
                category: "Testing",
                jwtToken: testJwtToken
            }

            await request(app).post("/api/add-service").send( payload ).expect((res) => {
                expect(res.body.error).toBe("")
                createdService = res.body.service
            })
        })
    })
})

describe("POST /edit-service", () => { 
    describe("Edits new service", () => {
        test("Succesfully edits service", async () => {
            const payload = {
                serviceId: createdService._id,
                newTitle: "NEWTESTING", 
                newImages: [ "https://res.cloudinary.com/dt7uj6vfp/image/upload/v1650606134/images/kli8ahfh70ugfruswy3f.jpg" ],
                newAddress: "Orlando, Fl", 
                newDescription: "NEWTESTING", 
                newPrice: "2", 
                newDaysAvailable: ["Tuesday"],
                newCategory: "NEWTESTING",
                jwtToken: testJwtToken
            }

            await request(app).post("/api/edit-service").send( payload ).expect((res) => {
                expect(res.body.error).toBe("")
            })
        })

        test("Fails to edit service", async () => {
            const payload = {
                serviceId: "6234c4d39a050a36555a6949",
                newTitle: "NEWTESTING", 
                newImages: [ "https://res.cloudinary.com/dt7uj6vfp/image/upload/v1650606134/images/kli8ahfh70ugfruswy3f.jpg" ],
                newAddress: "Orlando, Fl", 
                newDescription: "NEWTESTING", 
                newPrice: "2", 
                newDaysAvailable: ["Tuesday"],
                newCategory: "NEWTESTING",
                jwtToken: testJwtToken
            }

            await request(app).post("/api/edit-service").send( payload ).expect((res) => {
                expect(res.body.error).toBe("Incorrect serviceId")
            })
        })
    })
})

describe("POST /delete-service", () => { 
    describe("Deletes service", () => {
        test("Succesfully deletes service", async () => {
            const payload = {
                serviceId: createdService._id,
                jwtToken: testJwtToken,
                test: true
            }

            await request(app).post("/api/delete-service").send( payload ).expect((res) => {
                expect(res.body.error).toBe("")
            })
            
        })

        test("Fails to delete service", async () => {
            const payload = {
                serviceId: createdService._id,
                jwtToken: testJwtToken,
                test: true
            }

            await request(app).post("/api/delete-service").send( payload ).expect((res) => {
                expect(res.body.error).toBe("Couldn't delete service.")
            })
            
        })
    })
})

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
  })