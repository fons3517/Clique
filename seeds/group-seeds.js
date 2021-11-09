const { Group } = require('../models');

const groupData = [
  {
    name: 'Crypto Group',
    description: 'Wow look at them bitcoins',
  },
  {
    name: 'l33t-h4ckz0rz',
    description: 'wow look at them hackers',
  },
  {
    name: 'groups group',
    description: 'wow look at them groups',
  },
  {
    name: 'Jager House of Fun',
    description: 'wow look at them jagers',
  },
  {
    name: 'Alfonso Fan Page',
    description: 'wow look at him go',
  },
];

const seedGroups = () => Group.bulkCreate(groupData);

module.exports = seedGroups;
