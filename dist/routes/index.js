"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_route_1 = require("./categories.route");
const movies_route_1 = require("./movies.route");
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
];
routeList.forEach(({ path, route }) => {
    router.use(path, route);
});
exports.default = router;
