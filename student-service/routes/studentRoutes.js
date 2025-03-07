const express = require("express");
const axios = require('axios');
const Student = require("../models/Student");
const verifyToken = require("../../auth-service/middleware/verifyToken");

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
router.post("/removeCourse", async (req, res) => {
  try {
    const { courseId } = req.body;

    await Student.updateMany({ courses: courseId }, { $pull: { courses: courseId } });

    res.json({ message: `Course ${courseId} removed from students' enrollments.` });
  } catch (error) {
    console.error("Error updating students:", error);
    res.status(500).json({ message: "Error updating student enrollments", error });
  }
});

router.post("/enroll/:etudiant_id/:cours_id", verifyToken, async (req, res) => {
  try {
    const { etudiant_id, cours_id } = req.params;
    console.log(`Attempting to enroll student with ID ${etudiant_id} in course ID ${cours_id}`);

    const courseResponse = await axios.get(`http://localhost:5002/courses/${cours_id}`);
    console.log("Course response:", courseResponse.data); 

    if (!courseResponse.data) {
      return res.status(404).json({ message: "Course not found" });
    }

    const student = await Student.findOne({ id: etudiant_id });
    console.log("Student:", student); 

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.courses.includes(cours_id)) {
      return res.status(400).json({ message: "Student is already enrolled in this course" });
    }

    student.courses.push(cours_id);
    await student.save();

    if (!courseResponse.data.students.includes(etudiant_id)) {
      courseResponse.data.students.push(etudiant_id);
      await axios.put(`http://localhost:5002/courses/${cours_id}`, courseResponse.data);
    }

    console.log(`Student with ID ${etudiant_id} enrolled in course ID ${cours_id}`);
    res.json({ message: "Student enrolled successfully", student });
  } catch (error) {
    console.error("Error enrolling student:", error.response || error.message); 
    res.status(500).json({ message: "Error enrolling student", error: error.message });
  }
});
router.get("/enrolledCourses/:etudiant_id", verifyToken, async (req, res) => {
  try {
    const { etudiant_id } = req.params;

    const student = await Student.findOne({ id: etudiant_id });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const courseDetails = await Promise.all(
      student.courses.map(async (courseId) => {
        try {
          const response = await axios.get(`http://localhost:5002/courses/${courseId}`);
          return response.data;
        } catch (error) {
          console.error(`Error fetching course ${courseId}:`, error.message);
          return { id: courseId, title: "Unknown Course", error: "Course not found" };
        }
      })
    );

    res.json({ student, enrolledCourses: courseDetails });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving enrolled courses", error: error.message });
  }
});



module.exports = router;
