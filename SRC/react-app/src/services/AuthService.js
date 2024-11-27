const AuthService = {
    login: async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Login failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // Store token in localStorage
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token'); // Check for a token
    },
};

export default AuthService;
