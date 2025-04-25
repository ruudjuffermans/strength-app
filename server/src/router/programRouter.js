const { programController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

function exerciseRouter(app) {

    app.get(
        "/program/:id",
        asyncHandler(programController.getProgramById)
    );

    app.post(
        "/program/:id/activate",
        asyncHandler(programController.activateProgram)
    );

    app.get(
        "/program",
        asyncHandler(programController.getAllPrograms)
    );

    app.put(
        "/program/:id",
        asyncHandler(programController.updateProgram)
    );

    app.post(
        "/program",
        asyncHandler(programController.createProgram)
    );

    app.delete(
        "/program/:id",
        asyncHandler(programController.deleteProgram)
    );

    app.post(
        "/split/:programId",
        asyncHandler(programController.addSplit)
    );

    app.put(
        "/split/:splitId",
        asyncHandler(programController.editSplit)
    );

    app.delete(
        "/split/:splitId",
        asyncHandler(programController.removeSplit)
    );
}

module.exports = exerciseRouter;
