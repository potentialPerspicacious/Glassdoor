module.exports = (sequelize, Sequelize) => {
  const company = sequelize.define("company", {
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    street: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    cphoto_file_name: {
      type: Sequelize.STRING,
    },
    website: {
      type: Sequelize.STRING,
    },
    company_size: {
      type: Sequelize.STRING,
    },
    company_type: {
      type: Sequelize.STRING,
    },
    revenue: {
      type: Sequelize.STRING,
    },
    headquarters: {
      type: Sequelize.STRING,
    },
    industry: {
      type: Sequelize.STRING,
    },
    founded: {
      type: Sequelize.STRING,
    },
    mission: {
      type: Sequelize.STRING,
    },
    ceo_name: {
      type: Sequelize.STRING,
    },
  });
  return company;
};
