const exerciseRouter = require("./exerciseRouter");
const programRouter = require("./programRouter");
const workoutRouter = require("./workoutRouter");
const adminRouter = require("./adminRouter");

const { isAdmin } = require("../middleware/isAdmin");
const { isPremium } = require("../middleware/isPremium");
// const { auditLogger } = require("../middleware/auditLogger");


function router(app) {
  const routers = [
    { path: '/workout', router: workoutRouter },
    { path: '/program', router: programRouter },
    { path: '/exercise', router: exerciseRouter },
    { path: '/admin', middleware: [isAdmin], router: adminRouter },
  ];

  routers.forEach(({ path, router, middleware = [] }) => {
    app.use(path, ...middleware, router);
  });
}

module.exports = router;