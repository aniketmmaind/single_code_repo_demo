import "dotenv/config.js"
import cors from 'cors';

import organizationRoute from "./routes/organization.routes.js";
import express from "express";
import "./config/mongo.db.js";
import { errorHandler } from "./middlewares/auth.middleware.js";


const app = express();

// --- Global JSON parser for all other routes comes AFTER ---
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// ...after app.use(express.json()) and next to your auth route:
app.get('/', (req, res) => {
    res.write('<h1>AV Rental Backend</h1>');
});
app.use('/api/organization/v1', organizationRoute);

app.post('/api/demo', (req, res) => {
    console.log("req,body: ", req.body);
    res.status(201).json({
        success: true,
        message: "Data received successfully",
        data: req.body
    });
});

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Express App listening on ${PORT}`);
});

