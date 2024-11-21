require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(express.json());
app.use(cors());


const mongoUri = 'mongodb+srv://USER:user123@cluster0.2tfvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
if (!mongoUri) {
  console.error('MongoDB URI is not defined in the .env file!');
  process.exit(1);  // Exit the app if MongoDB URI is not defined
}

// Connect to MongoDB using the environment variable
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

// Use transaction routes
app.use("/api", transactionRoutes);

// Start the server
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

