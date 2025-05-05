const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB (creates 'company' DB if not exists)
mongoose.connect('mongodb://127.0.0.1:27017/company')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Employee schema and model
const employeeSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  department:  { type: String, required: true },
  designation: { type: String, required: true },
  salary:      { type: Number, required: true },
  joiningDate: { type: Date,   required: true }
});
const Employee = mongoose.model('Employee', employeeSchema, 'employees');

// Insert one initial employee if collection is empty
async function insertInitialEmployee() {
  const count = await Employee.countDocuments();
  if (count === 0) {
    await Employee.create({
      name: "Amit Sharma",
      department: "IT",
      designation: "Software Engineer",
      salary: 60000,
      joiningDate: new Date("2022-03-15")
    });
    console.log('Inserted initial employee.');
  }
}
insertInitialEmployee();

// View all employee records (styled HTML table with Employee ID)
app.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  let html = `
  <style>
    body { font-family: Arial, sans-serif; background: #f7f7f7; }
    h2 { color: #333; }
    table { border-collapse: collapse; margin: 20px 0; width: 95%; background: #fff; }
    th, td { padding: 10px 15px; text-align: center; }
    th { background: #0074D9; color: #fff; }
    tr:nth-child(even) { background: #f2f2f2; }
    tr:hover { background: #e6f7ff; }
    td { border-bottom: 1px solid #ddd; }
    .id { font-size: 0.9em; color: #555; }
  </style>
  <h2>Employee Records (${employees.length})</h2>
  <table>
    <tr>
      <th>Employee ID</th>
      <th>Name</th>
      <th>Department</th>
      <th>Designation</th>
      <th>Salary</th>
      <th>Joining Date</th>
    </tr>`;
  employees.forEach(emp => {
    html += `<tr>
      <td class="id">${emp._id}</td>
      <td>${emp.name}</td>
      <td>${emp.department}</td>
      <td>${emp.designation}</td>
      <td>${emp.salary}</td>
      <td>${emp.joiningDate.toISOString().split('T')[0]}</td>
    </tr>`;
  });
  html += '</table>';
  res.send(html);
});

// Add a new employee
app.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.send('Employee added!');
  } catch (err) {
    res.status(400).send('Error adding employee: ' + err.message);
  }
});

// Update an existing employee’s details by ID
app.put('/employees/:id', async (req, res) => {
  try {
    const result = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (result) {
      res.send('Employee updated!');
    } else {
      res.status(404).send('Employee not found.');
    }
  } catch (err) {
    res.status(400).send('Error updating employee: ' + err.message);
  }
});

// Delete an employee record by ID
app.delete('/employees/:id', async (req, res) => {
  try {
    const result = await Employee.findByIdAndDelete(req.params.id);
    if (result) {
      res.send('Employee deleted.');
    } else {
      res.status(404).send('Employee not found.');
    }
  } catch (err) {
    res.status(400).send('Error deleting employee: ' + err.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
