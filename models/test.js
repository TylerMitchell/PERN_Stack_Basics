module.exports = function(sequelize, DataTypes){
    return sequelize.define('test', {
        testData: DataTypes.STRING
    });
};