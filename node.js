const express = require('express');
const app = express();
const port = 3000;

// Use JSON middleware to parse incoming requests
app.use(express.json());

// Store driver's location in-memory (or use a database like MongoDB)
let driverLocation = null;

// Endpoint for the driver to share their location
app.post('/api/share-location', (req, res) => {
  const { latitude, longitude } = req.body;
  driverLocation = { latitude, longitude }; // Store location
  console.log(`Driver's location saved: ${latitude}, ${longitude}`);
  res.json({ status: 'Location shared successfully' });
});

// Endpoint for the student to view the driver's location
app.get('/api/get-driver-location', (req, res) => {
  if (driverLocation) {
    res.json(driverLocation); // Send the stored location
  } else {
    res.status(404).json({ error: 'Driver location not found' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
