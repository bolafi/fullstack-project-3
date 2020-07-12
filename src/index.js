//  استيراد المكتبات المطلوبة | import the required libraries
//  تأكد من تنزيل الوحدات المطلوبة | make sure to download the required modules
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import studentRoute from "./routes/studentRoute";
import teacherRoute from "./routes/teacherRoute";
dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database is connected"))
  .catch((error) => console.log(error));

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/students", studentRoute);
app.use("/api/v1/teachers", teacherRoute);

// page not found route
app.get("*", (req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// لا تنسى تحديد وظيفة الخادم | don't forget to define the server function that listens to requests
