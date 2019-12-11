const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const db = require("./db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/student", (req, res) => {
  const count = Number(req.query.count);
  if (isNaN(count)) {
    res.status(400).send("Expected a number, got " + req.query.count);
    return;
  }
  db.getStudentList(count)
    .then((studentList) => {
      res.send(studentList);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/student", (req, res) => {
  const { mssv, hoten } = req.body;
  db.insertStudent(mssv, hoten)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.delete("/student/:mssv", (req, res) => {
  const mssv = req.params.mssv;
  db.deleteStudent(mssv)
    .then(() => {
      res.send("");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.put("/student/:mssv", (req, res) => {
  const mssv = req.params.mssv;
  const hoten = req.body.hoten;
  db.updateStudent(mssv, hoten)
    .then(() => {
      res.send("");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
