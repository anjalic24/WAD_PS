const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// a) Connect to local MongoDB and create 'student' DB if not exists
mongoose.connect('mongodb://127.0.0.1:27017/student')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// b) Define the Student schema and model for 'studentmarks' collection
const studentSchema = new mongoose.Schema({
  Name:     { type: String, required: true },
  Roll_No:  { type: Number, required: true },
  WAD_Marks:    { type: Number, required: true },
  CC_Marks:     { type: Number, required: true },
  DSBDA_Marks:  { type: Number, required: true },
  CNS_Marks:    { type: Number, required: true },
  AI_Marks:     { type: Number, required: true }
});
const Student = mongoose.model('Student', studentSchema, 'studentmarks');

// c) Insert one initial student if collection is empty
async function insertInitialStudent() {
  const count = await Student.countDocuments();
  if (count === 0) {
    await Student.create({
      Name: "Riya Sharma",
      Roll_No: 1,
      WAD_Marks: 28,
      CC_Marks: 24,
      DSBDA_Marks: 30,
      CNS_Marks: 27,
      AI_Marks: 25
    });
    console.log('Inserted initial student.');
  }
}
insertInitialStudent();

// d, j) Display total count and all documents in browser as a table
app.get('/students', async (req, res) => {
  const students = await Student.find();
  const count = await Student.countDocuments();
  let html = ` 
    <style>
    body { font-family: Arial, sans-serif; background: #f7f7f7; }
    h2 { color: #333; }
    table { border-collapse: collapse; margin: 20px 0; width: 90%; background: #fff; }
    th, td { padding: 10px 15px; text-align: center; }
    th { background: #0074D9; color: #fff; }
    tr:nth-child(even) { background: #f2f2f2; }
    tr:hover { background: #e6f7ff; }
    td { border-bottom: 1px solid #ddd; }
  </style>
  <h2>Total Students: ${count}</h2><table border="1" cellpadding="5"><tr>
  <th>Name</th><th>Roll No</th><th>WAD</th><th>DSBDA</th><th>CNS</th><th>CC</th><th>AI</th></tr>`;
  students.forEach(stu => {
    html += `<tr>
      <td>${stu.Name}</td>
      <td>${stu.Roll_No}</td>
      <td>${stu.WAD_Marks}</td>
      <td>${stu.DSBDA_Marks}</td>
      <td>${stu.CNS_Marks}</td>
      <td>${stu.CC_Marks}</td>
      <td>${stu.AI_Marks}</td>
    </tr>`;
  });
  html += '</table>';
  res.send(html);
});

// e) List names of students who got more than 20 in DSBDA
app.get('/students/dsbda/above20', async (req, res) => {
  const students = await Student.find({ DSBDA_Marks: { $gt: 20 } }, { Name: 1, _id: 0 });
  let html = `<h2>Students with DSBDA > 20</h2><ul>`;
  students.forEach(stu => {
    html += `<li>${stu.Name}</li>`;
  });
  html += '</ul>';
  res.send(html);
});

// f) Update the marks of specified student by 10 (by Roll_No)
app.put('/students/:rollno/increment', async (req, res) => {
  const rollno = parseInt(req.params.rollno);
  const result = await Student.updateOne(
    { Roll_No: rollno },
    {
      $inc: {
        WAD_Marks: 10,
        CC_Marks: 10,
        DSBDA_Marks: 10,
        CNS_Marks: 10,
        AI_Marks: 10
      }
    }
  );
  if (result.matchedCount > 0 || result.n > 0) {
    res.send('Marks updated by 10 for the student.');
  } else {
    res.send('Student not found.');
  }
});

// g) List names who got more than 25 in all subjects
app.get('/students/allabove25', async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_Marks: { $gt: 25 }
  }, { Name: 1, _id: 0 });
  let html = `<h2>Students with >25 in all subjects</h2><ul>`;
  students.forEach(stu => {
    html += `<li>${stu.Name}</li>`;
  });
  html += '</ul>';
  res.send(html);
});

// h) List names who got less than 40 in both Maths and Science in browser
// (Assuming Maths = WAD_Marks, Science = CNS_Marks)
app.get('/students/less40mathsscience', async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $lt: 40 },
    CNS_Marks: { $lt: 40 }
  }, { Name: 1, _id: 0 });
  let html = `<h2>Students with <40 in both Maths (WAD) and Science (CNS)</h2><ul>`;
  students.forEach(stu => {
    html += `<li>${stu.Name}</li>`;
  });
  html += '</ul>';
  res.send(html);
});

// i) Remove specified student document (by Roll_No)
app.delete('/students/:rollno', async (req, res) => {
  const rollno = parseInt(req.params.rollno);
  const result = await Student.deleteOne({ Roll_No: rollno });
  if (result.deletedCount > 0) {
    res.send('Student deleted.');
  } else {
    res.send('Student not found.');
  }
});

// h) Add new student (POST)
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.send('Student added!');
  } catch (err) {
    res.status(400).send('Error adding student: ' + err.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
