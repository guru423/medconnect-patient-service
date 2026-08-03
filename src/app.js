const express = require('express');
const patientRoutes = require('./routes/patients');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'patient-service' });
});

app.use('/patients', patientRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'MedConnect Patient Service is running!' });
});

app.listen(PORT, () => {
  console.log(`Patient Service running on port ${PORT}`);
});