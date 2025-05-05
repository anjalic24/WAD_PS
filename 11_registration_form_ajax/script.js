// Handle registration with localStorage
function register() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const mobile = document.getElementById('mobile').value;
  const dob = document.getElementById('dob').value;
  const city = document.getElementById('city').value;
  const address = document.getElementById('address').value;
  const password = document.getElementById('password').value;

  // Validate form
  if (!name || !email || !mobile || !dob || !city || !address || !password) {
      alert("Please fill all the fields!");
      return;
  }

  // Check if the user already exists
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = existingUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
  
  if (userExists) {
      alert("User already exists!");
      return;
  }

  // Create a new user object
  const newUser = { name, email, mobile, dob, city, address, password };

  // Store the new user in localStorage
  existingUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(existingUsers));

  alert("Registration successful!");
  window.location.href = "login.html";  // Redirect to login after registration
}

// Handle login with localStorage
function login() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;

  // Validate input
  if (!username || !password) {
      alert("Please enter both username and password!");
      return;
  }

  // Get the users data from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  
  // Find the user (case-insensitive username matching)
  const user = users.find(user => user.email.toLowerCase() === username.toLowerCase() && user.password === password);

  if (user) {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "welcome.html";  // Redirect to welcome page
  } else {
      alert("Invalid username or password!");
  }
}
