import { Sequelize, DataTypes, Model, Op } from "sequelize";
import app from "../app";
import { emitDuplicateFundWarning } from "../services/fund-events";
import sequelize from "../services/db";
import union from "lodash.union";

class Fund extends Model {
  declare id: number;
  declare name: string;
}

export default function fundInit(sequelize: Sequelize) {
  Fund.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    alias: {
      allowNull: false,
      type: DataTypes.JSON,
      defaultValue: [],
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    startYear: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    sequelize,
    modelName: "fund",
    hooks: {
      afterCreate: async (fund, options) => {
        const fundFound = await sequelize.models.fund.findOne({
          where: {
            id: fund.id
          }
        }) as any;

        const possibleDuplicatedFunds = await sequelize.models.fund.findAll({
          where: {
            id: {
              [Op.ne]: fund.id
            },
            fundManagerId: fundFound.fundManagerId,

          }
        });

        const fundDuplicated = possibleDuplicatedFunds.find((fundsToSearch: any) =>
          fundsToSearch.alias.includes(fundFound.name) ||
          fundFound.alias.includes(fundsToSearch.name) ||
          union(fundsToSearch.alias, fundFound.alias).length > 0)

        if (fundDuplicated) {
          emitDuplicateFundWarning(app, { fundCreated: fund.dataValues, fundDuplicated: fundDuplicated.dataValues });
        }
      }
    },

  },
  )
}

export function association(sequelize: Sequelize) {
  sequelize.models.fund.belongsTo(sequelize.models.fundManager);

}
