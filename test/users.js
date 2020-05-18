const app = require("../app");
const faker = require("faker");
const chai = require("chai");
const chaiHttp = require("chai-http");

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
        expect(res).to.have.status(200);
        expect(res.body.name).to.equals(data.name);
        expect(res.body.email).to.equals(data.email);
        expect(res.body.password).to.equals(data.password);
        expect(res.body.contact).to.equals(data.contact);
        expect(res.body.avatar).to.equals(data.avatar);
        done();
      });
  });
});
