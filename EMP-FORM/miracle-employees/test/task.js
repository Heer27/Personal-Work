let chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("express");
const { DESCRIBE } = require("sequelize");
let server = require("../server");

chai.should();

chai.use(chaiHttp);

describe('Tasks API', () =>{
    
    describe("GET /api/employees", () => {
        it("It should GET all the employees", (done) => {
            chai.request(server)
            .get("/")
            .end((err, response) => {
                response.should.have.status(200);
                // response.body.should.be.a('array');
                // response.body.length.should.be.eq(3);
            done();
            });
        });
    });
})