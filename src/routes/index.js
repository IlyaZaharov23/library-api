const Router = require("express");
const usersRouter = require("./users.routes");
const booksRouter = require("./books.routes");
const bookLoansRouter = require("./bookLoans.routes");

const appRouter = Router();

appRouter.use(usersRouter);
appRouter.use(booksRouter);
appRouter.use(bookLoansRouter);

module.exports = appRouter;
