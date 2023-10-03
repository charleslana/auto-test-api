module.exports = {
  up: async (queryInterface, Sequelize) => {
    const itemScores = {
      1: 0,
      2: 0,
      3: 0,
      4: 1000,
      5: 1000,
      6: 2000,
      7: 3000,
      8: 5000,
      9: 7000,
      10: 4500,
      11: 5000,
      12: 6000,
      13: 10000,
      14: 7000,
      15: 10000,
      16: 2000,
    };
    const shopItems = Object.entries(itemScores).map(([itemId, score]) => ({
      score: score,
      item_id: parseInt(itemId),
    }));
    await queryInterface.bulkInsert('tb_shop', shopItems, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tb_shop', null, {});
  },
};
