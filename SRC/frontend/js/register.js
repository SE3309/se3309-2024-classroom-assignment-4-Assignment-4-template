document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phoneNo = document.getElementById('phoneNo').value;

  try {
    await registerDispatcher(firstName, lastName, phoneNo);
    alert('Account created successfully!');
    window.location.href = "login.html";
  } catch (err) {
    alert(`Registration failed: ${err.message}`);
  }
});
