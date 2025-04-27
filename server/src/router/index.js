const exerciseRouter = require("./exerciseRouter");
const splitRouter = require("./splitRouter");
const programRouter = require("./programRouter");
const workoutRouter = require("./workoutRouter");
const userRouter = require("./userRouter");

function router(app) {
  const routers = [
    { path: '/workout', router: workoutRouter },
    { path: '/program', router: programRouter },
    { path: '/exercise', router: exerciseRouter },
    { path: '/split', router: splitRouter },
    { path: '/user', router: userRouter },
  ];

  routers.forEach(({ path, router }) => {
    app.use(`${path}`, router);
  });
}

module.exports = router;
