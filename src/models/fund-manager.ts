import { Sequelize, DataTypes, Association } from "sequelize";

export default function fundManagerInit(sequelize: Sequelize) {
  sequelize.define('fundManager', {
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
    lastname: {
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

export function association(sequelize: Sequelize) {
  sequelize.models.fundManager.hasMany(sequelize.models.fund);  
  sequelize.models.fundManager.belongsTo(sequelize.models.company);  
}
