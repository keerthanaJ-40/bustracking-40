const geolib = require('geolib');
const twilio = require('twilio');
require('dotenv').config();

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const collegeLocation = {
    latitude: parseFloat(process.env.COLLEGE_LAT),
    longitude: parseFloat(process.env.COLLEGE_LNG),
};

const smsCache = new Set(); // prevent repeated SMS

async function checkProximityAndSendSMS(busId, lat, lng) {
    const currentLocation = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
    };

    const distance = geolib.getDistance(currentLocation, collegeLocation);

    console.log(`Bus ${busId} is ${distance}m from the college.`);

    if (distance <= 500 && !smsCache.has(busId)) {
        smsCache.add(busId);

        await client.messages.create({
            body: `🚌 Bus ${busId} is near the college!`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: process.env.ADMIN_PHONE_NUMBER,
        });

        console.log("✅ SMS sent!");

        setTimeout(() => smsCache.delete(busId), 10 * 60 * 1000); // reset cache in 10 min

        return '✅ SMS sent (within 500m)';
    }

    return 'ℹ️ Bus is not close enough for SMS.';
}

module.exports = { checkProximityAndSendSMS };
