// Initialize with 2 tasks if none exist
function initializeTasks() {
  if (!localStorage.getItem("tasks")) {
    const defaultTasks = [
      { name: "Complete project report" },
      { name: "Study for upcoming exam" }
    ];
    localStorage.setItem("tasks", JSON.stringify(defaultTasks));
  }
}

// Load and render tasks
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.name}</span>
      <div class="task-buttons">
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Add a task
function addTask() {
  const taskInput = document.getElementById("task");
  const taskName = taskInput.value.trim();
  if (taskName === "") return alert("Please enter a task.");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ name: taskName });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  loadTasks();
}

// Edit task
function editTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newName = prompt("Edit Task:", tasks[index].name);
  if (newName && newName.trim() !== "") {
    tasks[index].name = newName.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

// Delete task
function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// Initial load
initializeTasks();
loadTasks();
