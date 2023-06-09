// Imports: third-party packages.
const express = require('express');
const router = express.Router();

// Imports: local files.
const { create, getUserOrders} = require('../controllers/orderController');
// const { orderValidator } = require('../validations');
// const { validate } = require('../utils/functions');
const { httpVerbs } = require('../config');
// const { authorizeAdmin } = require('../middlewares');

// Define routes here.
const routes = [
    {
        path: '/placeorder',
        method: httpVerbs.POST,
        middlewares: [create],
    },
    {
        path: '/userorders',
        method: httpVerbs.POST,
        middlewares: [getUserOrders],
    },
];


// Mount routes accordingly.
for (const route of routes) {
    router.route(route.path)[route.method](route.middlewares);
}

// Exports of this file.
module.exports = router;