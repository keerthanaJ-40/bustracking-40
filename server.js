const express = require('express');
const app = express();
const port = 3000;

// Store driver's location (in-memory for simplicity, use a database in production)
let driverLocation = null;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint for the driver to share their location
app.post('/api/share-location', (req, res) => {
  const { latitude, longitude } = req.body;
  driverLocation = { latitude, longitude }; // Store the driver's location
  console.log(`Driver's location saved: ${latitude}, ${longitude}`);
  res.json({ status: 'Location shared successfully' });
});

// Endpoint for the user to get the driver's location
app.get('/api/get-driver-location', (req, res) => {
  if (driverLocation) {
    res.json(driverLocation); // Return the driver's location to the user
  } else {
    res.status(404).json({ error: "Driver's location not available" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
