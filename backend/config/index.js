// Imports: local files.
const httpCodes = require('./httpCodes');
const httpVerbs = require('./httpVerbs');

// Bundler object that is used to export all configurations inside ./config.
const bundler = { httpCodes, httpVerbs };

// Exports of this file.
module.exports = bundler;