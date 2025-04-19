const exerciseRouter = require("./exerciseRouter");
const splitRouter = require("./splitRouter");
const programRouter = require("./programRouter");
const workoutRouter = require("./workoutRouter");
const authRouter = require("./authRouter");

function router(app) {
  authRouter(app);
  splitRouter(app);
  exerciseRouter(app);
  programRouter(app);
  workoutRouter(app);
}

module.exports = router;