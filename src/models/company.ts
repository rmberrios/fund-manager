import { Sequelize, DataTypes } from "sequelize";

export default function companyInit(sequelize: Sequelize) {
  sequelize.define('company', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  });
}
