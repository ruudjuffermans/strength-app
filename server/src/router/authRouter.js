const { authController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

function authRouter(app) {
  app.post(
    "/api/auth/register",
    asyncHandler(authController.register)
  );

  app.post(
    "/api/auth/login",
    asyncHandler(authController.login)
  );

  app.post(
    "/api/auth/approve/:userId",
    asyncHandler(authController.approve)
  );

  app.get("/api/auth/me", 
    asyncHandler(authController.getContext)
  );

  app.post("/api/auth/logout", 
    asyncHandler(authController.logout)
  );
}

module.exports = authRouter;
