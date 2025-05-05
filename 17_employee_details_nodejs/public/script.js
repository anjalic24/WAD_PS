fetch('/api/employees')
  .then(res => res.json())
  .then(employees => {
    const directory = document.getElementById('directory');
    directory.innerHTML = employees.map(emp => `
      <div class="card">
        <img src="${emp.image}" alt="${emp.name}" class="profile-img">
        <div class="name">${emp.name}</div>
        <div class="designation">${emp.designation}</div>
        <div class="department">${emp.department}</div>
        <div class="salary">₹${emp.salary.toLocaleString()}</div>
      </div>
    `).join('');
  })
  .catch(() => {
    document.getElementById('directory').innerHTML = '<p>Failed to load employee data.</p>';
  });
