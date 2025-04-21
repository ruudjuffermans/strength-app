const { userController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

function userRouter(app) {
  app.get(
    "/user",
    asyncHandler(userController.getAll)
  );

  app.post(
    "/user/approve/:userId",
    asyncHandler(userController.approve)
  );

  app.post(
    "/user/disable/:userId",
    asyncHandler(userController.disable)
  );

  app.delete(
    "/user/remove/:userId",
    asyncHandler(userController.remove)
  );
}

module.exports = userRouter;
