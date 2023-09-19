import { Sequelize, DataTypes } from "sequelize";

export enum eventStatus {
  STARTED= "STARTED",
  FINISHED= "FINISHED",
}

export default function eventInit(sequelize: Sequelize) {
  sequelize.define('event', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    type: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING(100),
      defaultValue: eventStatus.STARTED
    },
    bundle: {
      allowNull: true,
      type: DataTypes.JSON
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
