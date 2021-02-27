module.exports = {
    secret: "ADD YOUR SECRET KEY",
    HOST: "URL TO MYSQL DATABASE",
    USER: "user_name",
    PASSWORD: "password",
    DB: "db_name",
    dialect: "mysql",
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };