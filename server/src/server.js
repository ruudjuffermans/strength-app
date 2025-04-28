const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router');
const errorHandler = require("./utils/errorHandler.js");
const authRouter = require('./router/authRouter.js');
const config = require("./utils/config.js");
const requireAuth = require('./middleware/requiresAuth.js');
const { decodeToken } = require('./utils/cryptography.js');

const PORT = config.SERVER_PORT;

const app = express()

app.use(cors({
    origin: config.CLIENT_URL,
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
            const decoded = decodeToken(token);
            req.user = decoded;
        } catch (err) {
            console.log("Invalid token:", err.message);
        }
    } else {
        console.log("No token provided.");
    }
    next();
});

app.use(requireAuth)

router(app);

app.use((req, res, next) => {
    console.log("404")
    next()
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(config.ENV)
    console.log(`Server is listenissssng on port ${PORT}`)
})