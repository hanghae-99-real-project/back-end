const redis = require('redis');
const dotenv = require('dotenv')
dotenv.config();

const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
});

redisClient.on('error', (err) => {
    console.error('Redis Error:', err);
});

redisClient.on('connect', () => {
    console.log('Redis connected!');
});

redisClient.connect();

module.exports = redisClient;

