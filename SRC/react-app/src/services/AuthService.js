const AuthService = {
  login: async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Store token in localStorage
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  faculty_login: async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/faculty/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Store token in localStorage
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token"); // Check for a token
  },

  getCurrentUserId: () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    
    try {
      // JWT tokens are base64 encoded with 3 parts: header.payload.signature
      const payload = token.split(".")[1];
      // Decode the base64 payload
      const decoded = JSON.parse(atob(payload));
      return decoded.user_id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  },
};

export default AuthService;
