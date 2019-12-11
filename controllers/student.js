const mongoose = require("../config/db");

const StudentSchema = new mongoose.Schema({
  mssv: {
    type: String,
    required: true,
    unique: true
  },
  hoten: {
    type: String,
    required: true
  }
});
const Student = new mongoose.model("students", StudentSchema);

/**
 * Get `count` first students, order by `mssv`.
 * In case `count` === -1, return all students.
 *
 * @param {Number} count Number of student to query
 * @returns {Array} Array of student [{_id, mssv, hoten}]
 */
const getStudentList = async (count) => {
  if (count == -1) {
    return await Student.find().sort({ mssv: 1 });
  }
  return await Student.find()
    .sort({ mssv: 1 })
    .limit(count);
};

/**
 * Insert a student into database.
 *
 * @param {String} mssv
 * @param {String} hoten
 * @returns {Object} Inserted student {_id, mssv, hoten}
 */
const insertStudent = async (mssv, hoten) => {
  if (await Student.findOne({ mssv })) {
    const err = Error(`MSSV ${mssv} already exists`);
    err.name = "INVALID_NEW_MSSV";
    throw err;
  }
  return Student.create({ mssv, hoten });
};

/**
 * Update a student, given their `mssv`.
 * Changes on both `mssv` and `hoten` are allowed.
 *
 * @param {String} mssv
 * @param {Object} newStudent {mssv, hoten}
 * @returns {Object} Updated student {_id, mssv, hoten}
 */
const updateStudent = async (mssv, newStudent) => {
  // Validate if `mssv` is in database or not.
  if ((await Student.countDocuments({ mssv })) == 0) {
    const err = Error(`MSSV ${mssv} does not exist`);
    err.name = "INVALID_MSSV";
    throw err;
  }

  // Request for `mssv` to be changed, have to validate new `mssv`
  if (newStudent.mssv && newStudent.mssv !== mssv) {
    if (await Student.findOne({ mssv: newStudent.mssv })) {
      const err = Error(`MSSV ${newStudent.mssv} already exists`);
      err.name = "INVALID_NEW_MSSV";
      throw err;
    }
  }

  return Student.findOneAndUpdate({ mssv }, { $set: newStudent }, { new: true });
};

/**
 * Delete a student from database, given their `mssv`.
 *
 * @param {String} mssv
 * @returns {Boolean} True if said student is successfully deleted, False otherwise.
 */
const deleteStudent = async (mssv) => {
  // Validate if `mssv` is in database or not.
  if ((await Student.countDocuments({ mssv })) == 0) {
    const err = Error(`MSSV ${mssv} does not exist`);
    err.name = "INVALID_MSSV";
    throw err;
  }

  return Student.deleteOne({ mssv });
};

module.exports = {
  getStudentList,
  insertStudent,
  updateStudent,
  deleteStudent
};
