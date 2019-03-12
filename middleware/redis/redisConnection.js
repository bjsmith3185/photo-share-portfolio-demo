const redis = require('redis')
require('dotenv').load();

options = {};

if (process.env.REDIS_PASSWORD) {
    options.password = process.env.REDIS_PASSWORD;
}

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_URL, options);

// console.log("cnx options:", client.connection_options);

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong with REDIS: ' + err);
});

module.exports = client;
