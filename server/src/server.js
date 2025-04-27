const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router');
const { errorHandler } = require("./utils/errorHandler.js");
const authRouter = require('./router/authRouter.js');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret_key";

const PORT = process.env.SERVER_PORT || 5001;

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));

app.use(express.json())

app.get('/health', (req, res) => {
    console.log("health")
    res.json({ "message": "healthy" })
})
app.use(cookieParser());

app.use("/auth", authRouter);

app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
        } catch (err) {
            console.log("Invalid token:", err.message);
        }
    } else {
        console.log("No token provided.");
    }
    next();
});

router(app);
app.use((req, res, next) => {
    console.log("404")
    next()
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listenissssng on port ${PORT}`)
})