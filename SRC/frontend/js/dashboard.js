document.addEventListener('DOMContentLoaded', () => {
  const profileInitialsDiv = document.getElementById('profile-initials');
  const logoutButton = document.getElementById('logout-button');

  // Function to fetch dispatcher details from local storage
  function getDispatcherDetails() {
    const dispatcher = localStorage.getItem('dispatcher');
    return dispatcher ? JSON.parse(dispatcher) : null;
  }

  // Function to set dispatcher initials dynamically
  function setDispatcherInitials(dispatcher) {
    if (dispatcher && dispatcher.firstName && dispatcher.lastName) {
      const initials = `${dispatcher.firstName[0]}${dispatcher.lastName[0]}`.toUpperCase();
      profileInitialsDiv.textContent = initials;
    } else {
      profileInitialsDiv.textContent = 'NA'; // Default if no dispatcher details are available
    }
  }

  // Fetch dispatcher details and set initials
  const dispatcher = getDispatcherDetails();
  setDispatcherInitials(dispatcher);

  // Logout functionality
  logoutButton.addEventListener('click', () => {
    alert('Logging out...');
    // Clear local storage or session storage for dispatcher
    localStorage.removeItem('dispatcher');
    // Redirect to login page
    window.location.href = 'login.html';
  });
});
