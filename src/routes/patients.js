const express = require('express');
const router = express.Router();
const patientData = require('../data/patients');

// GET /patients - anni patients list cheయండి
router.get('/', (req, res) => {
  res.json(patientData.getAllPatients());
});

// GET /patients/:id - oka specific patient
router.get('/:id', (req, res) => {
  const patient = patientData.getPatientById(req.params.id);
  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' });
  }
  res.json(patient);
});

// POST /patients - kొత్త patient create cheయండి
router.post('/', (req, res) => {
  const { name, age, condition } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: 'name and age are required' });
  }
  const newPatient = patientData.addPatient({ name, age, condition });
  res.status(201).json(newPatient);
});

// PUT /patients/:id - patient update cheయండి
router.put('/:id', (req, res) => {
  const updated = patientData.updatePatient(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Patient not found' });
  }
  res.json(updated);
});

// DELETE /patients/:id - patient delete cheయండి
router.delete('/:id', (req, res) => {
  const deleted = patientData.deletePatient(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Patient not found' });
  }
  res.status(204).send();
});

module.exports = router;