module.exports = {
    HOST: "34.132.213.188",
    USER: "root",
    PASSWORD: "1234",
    DB: "miracle-employee-gcp",
    dialect: "mysql",
    
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };