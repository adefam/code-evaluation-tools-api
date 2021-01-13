const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");
const dotenv = require('dotenv');

dotenv.config({ path: '../../config/config.env' });

Sentry.init({
    dsn: process.env.SENTRY_DSN
});

module.exports = Sentry
