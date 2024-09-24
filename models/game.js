const { Model, DataTypes } = require("sequelize");

module.exports = function GameModelGenerator(connection) {
  class Game extends Model {}

  Game.init(
    {
      id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      board: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: Array(9).fill(null),
      },
      currentPlayer: {
        type: DataTypes.ENUM("X", "O"),
        allowNull: false,
        defaultValue: "X",
      },
      status: {
        type: DataTypes.ENUM("ongoing", "finished"),
        allowNull: false,
        defaultValue: "ongoing",
      },
    },
    {
      sequelize: connection,
    }
  );

  return Game;
};