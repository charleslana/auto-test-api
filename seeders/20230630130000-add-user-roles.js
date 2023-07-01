module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM tb_user;',
    );

    const userIds = users[0].map(user => user.id);

    await queryInterface.bulkInsert(
      'tb_user_role',
      userIds.map(userId => ({
        name: 'admin',
        user_id: userId,
      })),
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tb_user_role', null, {});
  },
};
