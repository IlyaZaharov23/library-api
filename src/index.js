require("dotenv").config();
require("./sentry.instruments");
const Sentry = require("@sentry/node");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const YAML = require("yamljs");
const sequelize = require("./config/db");
const appRouter = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", appRouter);

Sentry.setupExpressErrorHandler(app);

sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
