document
  .getElementById("registrationForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, age }),
      });

      if (response.ok) {
        alert("User registered successfully");
      } else {
        const errorText = await response.text();
        alert(`Error registering user: ${errorText}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user");
    }
  });

document.getElementById("viewUsers").addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      alert("Error fetching users");
      return;
    }
    const users = await response.json();

    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `Username: ${user.username}, Age: ${user.age}, Registration Date: ${user.registration_date}`;
      userList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    alert("Error fetching users");
  }
});
