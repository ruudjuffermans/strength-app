const exerciseRouter = require("./exerciseRouter");
const splitRouter = require("./splitRouter");
const programRouter = require("./programRouter");
const workoutRouter = require("./workoutRouter");

function router(app) {
  splitRouter(app);
  exerciseRouter(app);
  programRouter(app);
  workoutRouter(app);
}

module.exports = router;