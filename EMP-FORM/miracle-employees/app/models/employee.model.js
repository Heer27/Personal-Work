module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      name: {
        type: Sequelize.STRING
      },
      emailid: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      skills: {
        type: Sequelize.STRING
      },
      state:{
        type: Sequelize.STRING
      }
    });
  
    return Employee;
  };