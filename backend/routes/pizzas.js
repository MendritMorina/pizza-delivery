// Imports: third-party packages.
const express = require('express');
const router = express.Router();

// Imports: local files.
const { getAll, create ,getOne,deleteOne,updateOne} = require('../controllers/pizzaController');
// const { pizzaValidator } = require('../validations');
// const { validate } = require('../utils/functions');
const { httpVerbs } = require('../config');
// const { authorizeAdmin } = require('../middlewares');

// Define routes here.
const routes = [
    {
        path: '/',
        method: httpVerbs.GET,
        middlewares: [getAll],
    },
    {
        path: '/:pizzaId',
        method: httpVerbs.GET,
        middlewares: [getOne],
    },
    {
        path: '/',
        method: httpVerbs.POST,
        middlewares: [create],
    },
    {
        path: '/:pizzaId',
        method: httpVerbs.PUT,
        middlewares: [updateOne],
    },
    {
        path: '/:pizzaId',
        method: httpVerbs.DELETE,
        middlewares: [deleteOne],
    },
];


// Mount routes accordingly.
for (const route of routes) {
    router.route(route.path)[route.method](route.middlewares);
}

// Exports of this file.
module.exports = router;