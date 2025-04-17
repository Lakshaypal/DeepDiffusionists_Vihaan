const express = require('express');
const cors = require('cors');
const app = express();

// Mock database (replace with real database in production)
let prescriptions = [];
let healthHistory = [];

app.use(cors());
app.use(express.json());

// Prescription endpoints
app.post('/api/prescriptions', (req, res) => {
  const prescription = {
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    ...req.body
  };
  prescriptions.push(prescription);
  res.status(201).json(prescription);
});

app.get('/api/prescriptions/:patientId', (req, res) => {
  const patientPrescriptions = prescriptions.filter(
    (p) => p.patientId === parseInt(req.params.patientId)
  );
  res.json(patientPrescriptions);
});

// Health history endpoints
app.post('/api/health-history/:patientId', (req, res) => {
  const historyEntry = {
    id: Date.now(),
    patientId: parseInt(req.params.patientId),
    ...req.body
  };
  healthHistory.push(historyEntry);
  res.status(201).json(historyEntry);
});

app.get('/api/health-history/:patientId', (req, res) => {
  const patientHistory = healthHistory.filter(
    (h) => h.patientId === parseInt(req.params.patientId)
  );
  res.json(patientHistory);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});