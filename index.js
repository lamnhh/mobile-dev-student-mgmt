const app = require("express")();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

// Set up middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
app.use("/student", require("./routes/student"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
