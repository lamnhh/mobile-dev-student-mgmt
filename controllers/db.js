const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const connectionString = process.env.CONNECTION_STRING;
mongoose.connect(connectionString, { useNewUrlParser: true });

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

const getStudentList = async (count) => {
  if (typeof count !== "number") {
    throw Error("Expected count to be an integer, got " + String(count) + " instead.");
  }
  if (count == -1) {
    return await Student.find().sort({ mssv: 1 });
  }
  return await Student.find()
    .sort({ mssv: 1 })
    .limit(count);
};

const insertStudent = (mssv, hoten) => {
  return Student.create({
    mssv,
    hoten
  });
};

const updateStudent = (mssv, newHoten) => {
  return Student.updateOne({ mssv }, { $set: { hoten: newHoten } });
};

const deleteStudent = (mssv) => {
  return Student.deleteOne({ mssv });
};

module.exports = {
  getStudentList,
  insertStudent,
  updateStudent,
  deleteStudent
};
