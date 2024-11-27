const API_BASE_URL = 'http://localhost:3000/api/auth';

// Function to call the register endpoint
async function registerDispatcher(firstName, lastName, phoneNo) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, phoneNo })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
}

// Function to call the login endpoint
async function loginDispatcher(phoneNo) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNo })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
}
