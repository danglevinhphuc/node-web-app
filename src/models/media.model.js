module.exports = (sequelize, Sequelize) => {
    const Media = sequelize.define("media", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        created: Sequelize.DATE,
        updated: Sequelize.DATE,
        name: Sequelize.STRING
    });

    return Media;
};