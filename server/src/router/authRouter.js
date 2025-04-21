const { authController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

function authRouter(app) {
  app.post(
    "/auth/register",
    asyncHandler(authController.register)
  );

  app.post(
    "/auth/login",
    asyncHandler(authController.login)
  );

  app.get("/auth/me", 
    asyncHandler(authController.getContext)
  );

  app.post("/auth/logout", 
    asyncHandler(authController.logout)
  );
}

module.exports = authRouter;
