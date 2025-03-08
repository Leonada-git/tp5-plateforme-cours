const express = require("express");
const axios = require('axios');
const Professeur = require("../models/Professeur");
const verifyToken = require("../../auth-service/middleware/verifyToken");

const router = express.Router();

router.get("/all", verifyToken, async (req, res) => {
  try {
    const professors = await Professeur.find();
    res.json(professors);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Professors", error });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await Professeur.findOne({ id: id }); 

    if (!professor) {
      return res.status(404).json({ message: "Professor not found" });
    }

    res.json(professor);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Professor", error });
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

    const courseResponse = await axios.get(`http://localhost:5001/course-service/course/${cours_id}`);
    if (!courseResponse.data) {
      return res.status(404).json({ message: "Course not found" });
    }

    const professeur = await Professeur.findById(professeur_id);
    if (!professeur) return res.status(404).json({ message: "Teacher not found" });

    professeur.courses.push(cours_id);
    await professeur.save();

    res.json({ message: "Course assigned to teacher", professeur });
  } catch (error) {
    res.status(500).json({ message: "Error assigning course", error });
  }
});

router.get("/enrolledStudents/:cours_id", verifyToken, async (req, res) => {
  try {
    const { cours_id } = req.params;

    const courseResponse = await axios.get(`http://localhost:5001/course-service/course/${cours_id}`);
    if (!courseResponse.data) {
      return res.status(404).json({ message: "Course not found" });
    }

    const enrolledStudents = [];
    for (let studentId of courseResponse.data.students) {
      const studentResponse = await axios.get(`http://localhost:5002/student-service/student/${studentId}`);
      enrolledStudents.push(studentResponse.data);
    }

    res.json({ course: courseResponse.data, enrolledStudents });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving enrolled students", error });
  }
});

module.exports = router;
