// Function to display the saved users from localStorage in card format
function displaySavedUsers() {
    const displayUsersDiv = document.getElementById('display-users');
    displayUsersDiv.innerHTML = ""; // Clear previous display

    // Get users from localStorage
    const usersFromStorage = JSON.parse(localStorage.getItem('savedUsers')) || [];

    if (usersFromStorage.length === 0) {
        displayUsersDiv.innerHTML = `<p>No saved users to display.</p>`;
        return;
    }

    usersFromStorage.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}'s avatar">
            <h3>${user.login}</h3>
            <p>${user.followers} Followers</p>
            <p>${user.public_repos} Repos</p>
        `;
        displayUsersDiv.appendChild(userCard);
    });
}

// Display saved users on page load
window.onload = function() {
    displaySavedUsers();
};
