module.exports = app => {
    const media = require("./handler");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", media.create);

    // Retrieve all media
    router.get("/", media.findAll);

    // Retrieve all published media

    // Retrieve a single Tutorial with id
    router.get("/:id", media.findOne);

    // Update a Tutorial with id
    router.put("/:id", media.update);

    // Delete a Tutorial with id
    router.delete("/:id", media.delete);

    // Delete all media
    router.delete("/", media.deleteAll);

    app.use('/api/media', router);
};