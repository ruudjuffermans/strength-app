const { programController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

function exerciseRouter(app) {

    app.get(
        "/api/program/:id",
        asyncHandler(programController.getProgramById)
    );

    app.get(
        "/api/program",
        asyncHandler(programController.getAllPrograms)
    );

    app.put(
        "/api/program/:id",
        asyncHandler(programController.updateProgram)
    );

    app.post(
        "/api/program",
        asyncHandler(programController.createProgram)
    );

    app.delete(
        "/api/program/:id",
        asyncHandler(programController.deleteProgram)
    );

    app.post(
        "/api/split/:programId",
        asyncHandler(programController.addSplit)
    );

    app.put(
        "/api/split/:splitId",
        asyncHandler(programController.editSplit)
    );

    app.delete(
        "/api/split/:splitId",
        asyncHandler(programController.removeSplit)
    );
}

module.exports = exerciseRouter;
