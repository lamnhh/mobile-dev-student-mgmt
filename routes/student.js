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
    res.status(400).send({
      message: `Expected a number, got ${req.query.count} instead.`
    });
    return;
  }
  Student.getStudentList(count)
    .then((studentList) => {
      res.send(studentList);
    })
    .catch((err) => {
      res.status(500).send(err);
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
      res.status(500).send(err);
    });
});

/**
 * PUT /student/#{MSSV}
 * {
 *    "mssv": "1712932_2"
 *    "hoten": "Nguyen Hy Hoai Lam_2"
 * }
 * Edit hoten of a student, given their mssv
 */
router.put("/:mssv", (req, res, next) => {
  const mssv = req.params.mssv;
  const student = {
    ...(req.body.mssv && { mssv: req.body.mssv }),
    ...(req.body.hoten && { hoten: req.body.hoten })
  };

  Student.updateStudent(mssv, student)
    .then((doc) => {
      // Returns updated document
      res.send(doc);
    })
    .catch((err) => {
      if (err.name) {
        if (err.name === "INVALID_MSSV" || err.name == "INVALID_NEW_MSSV") {
          res.status(400).send({ message: err.message });
          return;
        }
      }
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
