"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _studentRoute = _interopRequireDefault(require("./routes/studentRoute"));

var _teacherRoute = _interopRequireDefault(require("./routes/teacherRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  استيراد المكتبات المطلوبة | import the required libraries
//  تأكد من تنزيل الوحدات المطلوبة | make sure to download the required modules
_dotenv.default.config();

_mongoose.default.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log("Database is connected")).catch(error => console.log(error));

const app = (0, _express.default)(); //Middlewares

app.use((0, _morgan.default)("dev"));
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
})); // Routes

app.use("/api/v1/students", _studentRoute.default);
app.use("/api/v1/teachers", _teacherRoute.default); // page not found route

app.get("*", (req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
}); // لا تنسى تحديد وظيفة الخادم | don't forget to define the server function that listens to requests