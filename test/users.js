const app = require("../app");
const faker = require("faker");
const chai = require("chai");
const chaiHttp = require("chai-http");
const JWT = require("jsonwebtoken");
const { User } = require("../models");

const { expect } = chai;
chai.use(chaiHttp);

describe("Users", () => {
  it("Create Users", (done) => {
    const data = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.phone.phoneNumber(),
      avatar: faker.image.imageUrl(),
    };
    chai
      .request(app)
      .post("/users/")
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const decoded = JWT.verify(res.body.token, process.env.AUTH_SECRET_KEY);
        expect(res.body.user.id).to.equals(decoded.sub);
        expect(res.body.user.name).to.equals(data.name);
        expect(res.body.user.email).to.equals(data.email);
        expect(res.body.user.password).to.equals(data.password);
        expect(res.body.user.contact).to.equals(data.contact);
        expect(res.body.user.avatar).to.equals(data.avatar);
        done();
      });
  });

  it("User Duplication Error on create user", (done) => {
    const data = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.phone.phoneNumber(),
      avatar: faker.image.imageUrl(),
    };
    User.create(data).then(() => {
      chai
        .request(app)
        .post("/users/")
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.message).to.equals(
            "A user has already registered with this email."
          );
          done();
        });
    });
  });
});
