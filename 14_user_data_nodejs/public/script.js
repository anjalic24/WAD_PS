document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        document.getElementById('loading').textContent = 
            'Error loading user data. Please try again later.';
    }
});

function displayUsers(users) {
    const tableBody = document.getElementById('user-data');
    const loadingElement = document.getElementById('loading');
    const tableElement = document.getElementById('user-table');

    // Clear loading message
    loadingElement.style.display = 'none';
    
    // Populate table
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
        `;
        tableBody.appendChild(row);
    });

    // Show table
    tableElement.style.display = 'table';
}