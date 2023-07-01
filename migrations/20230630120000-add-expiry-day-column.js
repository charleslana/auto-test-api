module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tb_item', 'expiry_day', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tb_item', 'expiry_day');
  },
};
