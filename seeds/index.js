const { sequelize } = require('../config/connection');
const seedGroups = require('./group-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedGroups();
  console.log('groups seeded');
  process.exit(0);
};

seedAll();
