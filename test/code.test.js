const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

const payload = require("../mock/payload");
const expectedData = require("../mock/expectedData");

chai.use(chaiHttp);

describe("API test suite", () => {
  it("Should call transformData function and return expectedData with 200 status", done => {
    chai
      .request(app)
      .post("/")
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(expectedData);
        done();
      });
  });

  it("Should not call transformData for Empty payload and return 201 status", done => {
    chai
      .request(app)
      .post("/")
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });  

  it("Should not call transformData for Empty payload and return 202 status", done => {
    delete payload.referenceData;
    chai
      .request(app)
      .post("/")
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(202);
        done();
      });
  });  

  it("Should call transformData function for Invalid valueType and return 203 status", done => {
    payload.payload.value[2].valueType = "object";
    chai
      .request(app)
      .post("/")
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(202);
        done();
      });
  }); 

});