const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://USER:user123@cluster0.2tfvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

// Use transaction routes
app.use("/api", transactionRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
