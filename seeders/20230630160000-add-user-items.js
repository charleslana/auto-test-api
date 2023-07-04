module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM tb_user;'
    );
    const userIds = users[0].map(user => user.id);
    const items = {
      1: userIds[0],
      2: userIds[0],
      3: userIds[0],
    };
    const userItems = Object.entries(items).map(([itemId, userId]) => ({
      item_id: parseInt(itemId),
      user_id: userId,
    }));
    await queryInterface.bulkInsert('tb_user_item', userItems, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tb_user_item', null, {});
  },
};
