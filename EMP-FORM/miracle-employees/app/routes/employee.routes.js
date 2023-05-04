module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", employees.create);
    
    router.get("/", employees.findAll);
     
    router.get("/:id", employees.findOne);

    router.put("/:id", employees.update);

    router.delete("/:id", employees.delete);

    router.delete("/", employees.deleteAll);

    app.use('/api/employees', router);

  };

  

  //     app.post("/sendmail", (req, res) => {
//   console.log("request came");
//   let user = req.body;
//   sendMail(user, (err, info) => {
//     if (err) {
//       console.log(err);
//       res.status(400);
//       res.send({ error: "Failed to send email" });
//     } else {
//       console.log("Email has been sent");
//       res.send(info);
//     }
//   });
// });
