const express = require("express");
const Professeur = require("../models/Professeur");
const Course = require("../../course-service/models/Course");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/all", verifyToken, async (req, res) => {
  try {
    const Professeur = await Professeur.find();
    res.json(Professeur);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Professors", error });
  }
});

router.post("/add", verifyToken, async (req, res) => {
  try {
    const { name, bio } = req.body;

    const newProfesseur = new Professeur({ name, bio });
    await newProfesseur.save();

    res.status(201).json({ message: "Teacher added successfully", newProfesseur });
  } catch (error) {
    res.status(500).json({ message: "Error adding teacher", error });
  }
});

router.post("/assign/:professeur_id/:cours_id", verifyToken, async (req, res) => {
  try {
    const { professeur_id, cours_id } = req.params;

    const course = await Course.findById(cours_id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const Professeur = await Professeur.findById(professeur_id);
    if (!Professeur) return res.status(404).json({ message: "Teacher not found" });

    Professeur.courses.push(cours_id);
    await Professeur.save();

    res.json({ message: "Course assigned to teacher", Professeur });
  } catch (error) {
    res.status(500).json({ message: "Error assigning course", error });
  }
});

router.get("/enrolledStudents/:cours_id", verifyToken, async (req, res) => {
  try {
    const { cours_id } = req.params;

    const course = await Course.findById(cours_id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const enrolledStudents = [];
    for (let studentId of course.students) {
      const student = await Student.findById(studentId);
      enrolledStudents.push(student);
    }

    res.json({ course, enrolledStudents });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving enrolled students", error });
  }
});

module.exports = router;
