import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// returns the users data
app.use("/api", apiRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
