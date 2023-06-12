'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'BookMarks', // name of Target model
        'isBookmarked', // name of the key we're adding
        {
          type: Sequelize.BOOLEAN,
          defaultValue: true
          // setting foreign key relationship
        }
      )
  },

  down: (queryInterface, Sequelize) => {

  },
};

