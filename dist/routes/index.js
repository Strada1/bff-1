"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_route_1 = require("./categories.route");
const movies_route_1 = require("./movies.route");
const comments_route_1 = require("./comments.route");
const directors_route_1 = require("./directors.route");
const router = (0, express_1.Router)();
const routeList = [
    {
        path: '/categories',
        route: categories_route_1.categoriesRoute,
    },
    {
        path: '/movies',
        route: movies_route_1.moviesRoute,
    },
    {
        path: '/comments',
        route: comments_route_1.commentsRoute,
    },
    {
        path: '/directors',
        route: directors_route_1.directorsRoute,
    },
];
routeList.forEach(({ path, route }) => {
    router.use(path, route);
});
exports.default = router;
