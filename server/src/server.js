const express = require('express')
const cors = require('cors');
const router = require('./router');
const {errorHandler} = require("./utils/errorHandler.js"); 

const PORT = process.env.PORT || 3001;

const app = express()

app.use(cors({
    origin: '*' 
}));

app.use(express.json())

app.get('/health', (req, res) => {
    console.log("health")
    res.json({"message": "healthy"})
})

router(app);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listenissssng on port ${PORT}`)
})