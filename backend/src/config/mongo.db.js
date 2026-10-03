import mongoose from "mongoose";
import dns from "node:dns/promises";

// 1. Force Node.js to use public DNS servers (Fixes ECONNREFUSED)
dns.setServers(["1.1.1.1", "8.8.8.8"]);
mongoose.connect(process.env.MONGODB_URL, {});

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to DB");
});

db.on('disconnected', () => {
    console.log("Disconnected from DB");
});

db.on('error', (error) => {
    console.log(`DB ERROR: ${error}`);
});

export default db;