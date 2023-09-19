import express, { Router, Express, Request, Response, NextFunction } from 'express';
import sequelize from "../services/db";
import config from "../config";
import { Op } from "sequelize";
import { parseQueryToInteger } from "../utils/helper";
import { pageQueryMiddleware, paginationMiddleware } from '../middleware';

const router = Router();

router.get("/", pageQueryMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  let where: any = {};

  if (typeof req.query.fundManagerName === "string" && req.query.fundManagerName.length > 0) {
    where['$fundManager.name$'] = {
      [Op.substring]: req.query.fundManagerName
    };
  }

  if (typeof req.query.name === "string" && req.query.name.length > 0) {
    where['name'] = {
      [Op.substring]: req.query.name
    };
  }

  if (req.query.year && parseQueryToInteger(req.query.year)) {
    where['startYear'] = {
      [Op.eq]: req.query.year
    };
  }

  const collection = await sequelize.models.fund.findAndCountAll({
    where,
    include: [{
      model: sequelize.models.fundManager,
      as: 'fundManager'
    }],
    limit: res.locals.limit,
    offset: res.locals.offset,
  });

  res.locals.collection = collection;
  next();

}, paginationMiddleware);

router.post("/:fundId", async (req: Request, res: Response) => {
  const fundFound = await sequelize.models.fund.findByPk(parseQueryToInteger(req.params.fundId));

  if (!fundFound) {
    res.status(404).send('Not found');
    return;
  }

  const updateClause: any = {};

  if (typeof req.body.name === "string" && req.body.name.length > 0) {
    updateClause.name = req.body.name;
  }

  if (typeof req.body.alias === "string") {
    req.body.alias = [req.body.alias]
  }

  if (Array.isArray(req.body.alias)) {
    updateClause.alias = req.body.alias;
  }
  const yearFromBody = parseQueryToInteger(req.body.year) || parseQueryToInteger(req.body.startYear);
  if (yearFromBody && yearFromBody > 1900) {
    updateClause.startYear = yearFromBody
  }

  if (Object.keys(updateClause).length > 0) {
    await fundFound.update(updateClause);
  }

  res.send({ fund: fundFound });
});

export default router;