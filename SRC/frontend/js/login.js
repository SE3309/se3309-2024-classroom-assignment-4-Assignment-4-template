document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const phoneNo = document.getElementById('phoneNo').value;

  try {
    const dispatcher = await loginDispatcher(phoneNo);
    alert(`Welcome, ${dispatcher.firstName} ${dispatcher.lastName}!`);
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(`Login failed: ${err.message}`);
  }
});
