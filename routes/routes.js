const {addMovieRoutes} = require("./movieRoutes");
const {addCategoryRoutes} = require("./categoryRoutes");
const {addCommentsRoutes} = require("./commentsRoutes");
const {addDirectorsRoutes} = require("./directorRoutes");

const addRoutes = (app) => {
    addMovieRoutes(app);
    addCategoryRoutes(app);
    addCommentsRoutes(app);
    addDirectorsRoutes(app);
};

module.exports = {
    addRoutes
};