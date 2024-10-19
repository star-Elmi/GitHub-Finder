// Initialize saved users from localStorage if available
let savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || [];

// Function to search for a GitHub user using async/await
async function searchUser() {
    const username = document.getElementById('username').value;

    if (username === "") {
        alert("Please enter a GitHub username.");
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const user = await response.json();

        if (user.message === "Not Found") {
            alert("User not found");
        } else {
            displayUserInfo(user);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display the user's info on the page
function displayUserInfo(user) {
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = `
        <h2>${user.login}</h2>
        <img src="${user.avatar_url}" alt="${user.login}'s avatar" width="100">
        <p><strong>Followers:</strong> ${user.followers}</p>
        <p><strong>Following:</strong> ${user.following}</p>
        <p><strong>Repos:</strong> ${user.public_repos}</p>
    `;

    // Push user to the array of saved users (temporary, until saved by user)
    savedUsers.push(user);
}

// Function to save user in localStorage and display the saved users list
function saveUser() {
    if (savedUsers.length === 0) {
        alert("No user to save!");
        return;
    }

    // Save to localStorage
    localStorage.setItem('savedUsers', JSON.stringify(savedUsers));

    // Display saved users in the display-users div
    displaySavedUsers();
}

// Function to display the saved users from localStorage in card format
function displaySavedUsers() {
    const displayUsersDiv = document.getElementById('display-users');
    displayUsersDiv.innerHTML = ""; // Clear previous display

    // Get users from localStorage
    const usersFromStorage = JSON.parse(localStorage.getItem('savedUsers')) || [];

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
