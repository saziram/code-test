/*
  Unit Testcases
  Technologies used - Mocha & Chai
*/

const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

const payload = require("../mock/payload");
const expectedData = require("../mock/expectedData");

chai.use(chaiHttp);

//testcases for Post API endpoint
describe("API test suite", () => {
  /*
  * it should call transformData function 
  * it should convert payload data into expected response
  * it should respond the transformed json data with status as 200
  */
 it("Should call transformData function and return 200 status with expectedData", done => {
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

  /*
  * it should call transformData function 
  * it should allow Array or String valueType
  * it should return the status as 203 for other valueTypes
  */    
 it("Should call transformData function and return 203 status for other valueTypes except Array/String", done => {
  payload.payload.value[2].valueType = "boolean";
  chai
    .request(app)
    .post("/")
    .send(payload)
    .end((err, res) => {
      expect(res).to.have.status(203);
      done();
    });
}); 

  /*
  * it should not call transformData function 
  * it should return the status as 201 for empty payload
  */
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

  /*
  * it should not call transformData function 
  * it should return the status as 202 if either referenceData or payload object is not exist in payload
  */  
  it("Should not call transformData if either referenceData or payload object not exist in payload and return 202 status", done => {
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

});