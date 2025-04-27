const { authHandler } = require('../handlers');

const register = async (req, res) => {
  try {
    console.log(req.body)
    const user = await authHandler.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Failed to register user." });
  }
};

const login = async (req, res) => {
  try {
    const credentials = req.body;
    const result = await authHandler.login(credentials);
    if (!result) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    res.status(200).json(result); // Usually { token, user }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to log in." });
  }
};

const getContext = async (req, res) => {
  try {
    const user = await authHandler.getUserFromCookie(req);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Failed to fetch user context:", err);
    res.status(500).json({ message: "Failed to get user context" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // ✅ true in production with HTTPS
      sameSite: "Lax", // or "Strict" or "None" as needed
    });
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Failed to logout." });
  }
};

module.exports = {
  register,
  login,
  getContext,
  logout
};
