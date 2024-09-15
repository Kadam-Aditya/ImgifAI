import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import generateImageRoute from "./routes/GenerateImage.js";
import posts from "./routes/Posts.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use("/api/generateImage/", generateImageRoute);
app.use("/api/post/", posts);


app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers from GFG",
  });
});

mongoose.set('strictQuery', true);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,          // Ensures use of new URL string parser
      useUnifiedTopology: true,       // Ensures use of new topology engine
    });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB");
  }
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
