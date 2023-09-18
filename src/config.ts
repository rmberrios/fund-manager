import dotenv from 'dotenv';

dotenv.config();

const env = process.env;
const DB = {
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  port: env.DB_PORT,

};

const APP = {
  expressPort: env.EXPRESS_PORT,
  listPerPage: 10
}

export default { DB, APP };
