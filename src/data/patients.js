// In-memory dummy patient data (no real database yet - that comes in Phase 3)
let patients = [
  {
    id: 1,
    name: "Ravi Kumar",
    age: 34,
    condition: "Hypertension",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Priya Sharma",
    age: 28,
    condition: "Diabetes Type 2",
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;

module.exports = {
  getAllPatients: () => patients,

  getPatientById: (id) => patients.find(p => p.id === parseInt(id)),

  addPatient: (patient) => {
    const newPatient = {
      id: nextId++,
      ...patient,
      createdAt: new Date().toISOString()
    };
    patients.push(newPatient);
    return newPatient;
  },

  updatePatient: (id, updates) => {
    const index = patients.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;
    patients[index] = { ...patients[index], ...updates };
    return patients[index];
  },

  deletePatient: (id) => {
    const index = patients.findIndex(p => p.id === parseInt(id));
    if (index === -1) return false;
    patients.splice(index, 1);
    return true;
  }
};