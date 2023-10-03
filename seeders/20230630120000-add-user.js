module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tb_user', [
      {
        email: 'test@test.com',
        password:
          '$2b$10$qL/2nTQCpcA1Kx.lisjlV.8v/r520zoiVtzQ9KwpQ79qoNXp5ySy6',
        name: 'test',
        score: 999999999,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tb_user', null, {});
  },
};
