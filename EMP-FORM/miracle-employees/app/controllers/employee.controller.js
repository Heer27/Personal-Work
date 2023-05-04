const db = require("../models");
const Employee = db.employee;
const Op = db.Sequelize.Op;
const Joi = require('joi');
const nodemailer = require("nodemailer");
// const details = require("./details.json");

// const sendgridTransport = require('nodemailer-sendgrid-transport');

// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth: {}
// }));


const { func } = require("joi");


exports.create = (req, res) => {

    const employee = {
    name : req.body.name,
    emailid : req.body.emailid,
    phone : req.body.phone,
    location : req.body.location,
    skills : req.body.skills,
    state: req.body.state
    };

    data = req.body

    const schema = Joi.object({
        name: Joi.string().required().max(20),
        emailid: Joi.string().email().pattern(new RegExp("^[a-zA-Z0-9]+@miraclesoft.com$")).required(),
        phone: Joi.number().required().min(8),
        location: Joi.string().required().max(15),
        skills: Joi.string().required().max(20),
        state: Joi.string().required(),
    });

   // const { value, err } = schema.validate(data);
    const pass = schema.validate(data);
    if(pass.error){
        console.log(pass.error);
    
    res.status(400).send({status:"error", error: pass.error});
    }
    else{
      
        let transporter = nodemailer.createTransport({
          host: "smtp.miraclesoft.com",
          port: 587,
          // secure: false,
          auth: {
            user: "hpatel@miraclesoft.com",
            pass:  "Me@Miracle@21" 
          },
          tls: {
            rejectUnauthorized: false
          }
        });
      
        const mailOptions= {
          
          from : "hpatel@miraclesoft.com",
          to: "hpatel@miraclesoft.com",
          subject: "User Registered Successfully",
          text: "Email Registered successfully!!"
        };
      
        //  transporter.sendMail(mailOptions);

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
          console.log(error);
          
          } else {
          console.log("Email sent: " + info.response);
          }
          });
  
      
      }
    
      Employee.create(employee)
     .then(data => {
       res.send(data);
    
    })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the Employee."
       });
     });

    };
      
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Employee.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employees."
        });
      });
};

exports.findOne = (req, res) => {
  
    const id = req.params.id;

    Employee.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Employee with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Employee with id=" + id
        });
      });

};

exports.update = (req, res) => {
  
    const id = req.params.id;

  Employee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });

};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Employee.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employee was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Employee with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Employee.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Employees were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Employees."
        });
      });
  };

// To Create and for Post Method without using Joi Validation
//   if (!req.body.name) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//     return;
//   }

//   const employee = {
//     name: req.body.name,
//     emailid: req.body.emailid,
//     phone: req.body.phone,
//     location: req.body.location,
//     skills: req.body.skills
//   };

//   Employee.create(employee)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Employee."
//       });
//     });
