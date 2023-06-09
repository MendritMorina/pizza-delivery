// Imports: third-party packages.
const express = require('express');
const router = express.Router();

// Imports: local files.
const { register,login} = require('../controllers/authController');
// const { userValidator } = require('../validations');
// const { validate } = require('../utils/functions');
const { httpVerbs } = require('../config');
// const { authorizeAdmin } = require('../middlewares');

// Define routes here.
const routes = [
    {
        path: '/register',
        method: httpVerbs.POST,
        middlewares: [register],
    },
    {
        path: '/login',
        method: httpVerbs.POST,
        middlewares: [login],
    },
];


// Mount routes accordingly.
for (const route of routes) {
    router.route(route.path)[route.method](route.middlewares);
}

// Exports of this file.
module.exports = router;