const express = require("express");
const Student = require("../models/Student");
const Course = require("../models/Course");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/all", verifyToken, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving students", error });
  }
});

router.post("/add", verifyToken, async (req, res) => {
  try {
    const { name, email, courses } = req.body;

    const newStudent = new Student({ name, email, courses });
    await newStudent.save();

    res.status(201).json({ message: "Student added successfully", newStudent });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
});

router.post("/enroll/:etudiant_id/:cours_id", verifyToken, async (req, res) => {
  try {
    const { etudiant_id, cours_id } = req.params;

    const course = await Course.findById(cours_id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const student = await Student.findById(etudiant_id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (student.courses.includes(cours_id)) {
      return res.status(400).json({ message: "Student is already enrolled in this course" });
    }

    student.courses.push(cours_id);
    await student.save();

    if (!course.students.includes(etudiant_id)) {
      course.students.push(etudiant_id);
      await course.save();
    }

    res.json({ message: "Student enrolled successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error enrolling student", error });
  }
});

router.get("/enrolledCourses/:etudiant_id", verifyToken, async (req, res) => {
  try {
    const { etudiant_id } = req.params;

    const student = await Student.findById(etudiant_id).populate("courses");
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ student, courses: student.courses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving enrolled courses", error });
  }
});

module.exports = router;
