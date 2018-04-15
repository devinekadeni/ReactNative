const twilio = require('twilio');

const accountSid = 'ACf5e27b7234693c2c0a29a2cec66787b8';
const authToken = '6cac210699d2075d17fcddb1cdcc5525';

module.exports = new twilio.Twilio(accountSid, authToken);