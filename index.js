import express from "express"; //framework to create api
import cors from "cors"; //communicate between front and back
import mongoose from "mongoose"; //mongodb arm to send queries to db
import { userRouter } from "./routes/userRoute.js";
import { recipeRouter } from "./routes/recipeRoute.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(); //generate  the version of our api

//middle ware
app.use(express.json()); //converts the received data to json
app.use(cors()); //api request from the front

app.use("/auth", userRouter);
app.use("/recipeRoute", recipeRouter);

//static files
app.use(express.static(path.join(__dirname, "./my-app/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./my-app/build/index.html"));
});

//connecting to database
mongoose.connect(
  "mongodb+srv://waliuddin0601:cloudkitchen@cluster0.fyxjgyi.mongodb.net/Receipe"
);

app.listen(8000, () => console.log("server started!"));
