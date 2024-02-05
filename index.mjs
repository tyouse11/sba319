import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import sales from "./routes/sales.mjs"

// Connection string
const MONGO_URI = process.env.MONGO_URI
const db = mongoose.connection
// Conncect to MongoDB through Mongoose
mongoose.connect(MONGO_URI)


// Connection Error/Success
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is mongodb not running?"));
db.on("open", () => console.log("mongo connected: ", MONGO_URI));
db.on("close", () => console.log("mongo disconnected"));

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

// root route
app.get("/", (req, res) => {
    res.send("Welcome to Sales Data");
});

app.use("/sales", sales);

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
  });

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });