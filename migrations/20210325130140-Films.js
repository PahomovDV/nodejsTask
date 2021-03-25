// eslint-disable-next-line import/no-commonjs
module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('Films', {
            id        : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
            title     : { type: Sequelize.STRING, allowNull: false, unique: true },
            year      : { type: Sequelize.INTEGER, allowNull: false },
            type      : { type: Sequelize.STRING, allowNull: false },
            stars     : { type: Sequelize.STRING, allowNull: false },
            createdAt : { type: Sequelize.DATE, allowNull: false },
            updatedAt : { type: Sequelize.DATE, allowNull: false }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('Films');
    }
};
