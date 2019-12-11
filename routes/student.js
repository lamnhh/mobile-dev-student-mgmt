const router = require("express").Router();
const Student = require("../controllers/student");

/**
 * GET /student?count=#{STUDENT_COUNT}
 * Return STUDENT_COUNT students with smallest mssv.
 * Return all students if STUDENT_COUNT = -1
 */
router.get("/", (req, res) => {
  const count = Number(req.query.count);
  if (isNaN(count)) {
    res.status(400).send("Expected a number, got " + req.query.count);
    return;
  }
  Student.getStudentList(count)
    .then((studentList) => {
      res.send(studentList);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/**
 * POST /student
 * {
 *    "mssv": "1712932",
 *    "hoten": "Nguyen Hy Hoai Lam"
 * }
 * Insert a new student into database.
 */
router.post("/", (req, res) => {
  const { mssv, hoten } = req.body;
  Student.insertStudent(mssv, hoten)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/**
 * DELETE /student/#{MSSV}
 * Delete a student from database, given their mssv
 */
router.delete("/:mssv", (req, res) => {
  const mssv = req.params.mssv;
  Student.deleteStudent(mssv)
    .then(() => {
      res.send("");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/**
 * PUT /student/#{MSSV}
 * {
 *    "hoten": "Nguyen Hy Hoai Lam 2"
 * }
 * Edit hoten of a student, given their mssv
 */
router.put("/:mssv", (req, res) => {
  const mssv = req.params.mssv;
  const hoten = req.body.hoten;
  Student.updateStudent(mssv, hoten)
    .then(() => {
      res.send("");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
