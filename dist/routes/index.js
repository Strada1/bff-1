"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chats_route_1 = require("./chats.route");
const messages_route_1 = require("./messages.route");
const users_route_1 = require("./users.route");
const router = (0, express_1.Router)();
const routeList = [
    {
        path: '/chats',
        route: chats_route_1.chatsRoute,
    },
    {
        path: '/messages',
        route: messages_route_1.messagesRoute,
    },
    {
        path: '/users',
        route: users_route_1.usersRoute,
    },
];
routeList.forEach(({ path, route }) => {
    router.use(path, route);
});
exports.default = router;
