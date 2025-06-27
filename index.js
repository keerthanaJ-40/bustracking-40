const express = require('express');
const cors = require('cors');
const { checkProximityAndSendSMS } = require('./smsAlert');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/location', async (req, res) => {
    const { busId, lat, lng } = req.body;
    if (!busId || !lat || !lng) return res.status(400).json({ message: 'Missing data' });

    try {
        const result = await checkProximityAndSendSMS(busId, lat, lng);
        res.json({ message: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error sending SMS' });
    }
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
