import config from './config';
import app from "./app";

const port = config.APP.expressPort;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});