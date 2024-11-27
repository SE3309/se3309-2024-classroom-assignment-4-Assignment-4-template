document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const phoneNo = document.getElementById('phoneNo').value;

  try {
    const response = await loginDispatcher(phoneNo);
    alert(`Welcome, ${response.dispatcher.name}!`);
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(`Login failed: ${err.message}`);
  }
});
