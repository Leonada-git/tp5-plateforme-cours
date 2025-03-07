const express = require("express");
const Course = require("../models/Course");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.use(verifyToken);

router.get("/all", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { id, titre, professeur_id, description, prix } = req.body;
    const newCourse = new Course({ id, titre, professeur_id, description, prix });
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully", newCourse });
  } catch (error) {
    res.status(500).json({ message: "Error adding course", error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updatedCourse = await Course.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course updated successfully", updatedCourse });
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedCourse = await Course.findOneAndDelete({ id: req.params.id });
    if (!deletedCourse) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully", deletedCourse });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;
    const courses = await Course.find({
      $or: [
        { titre: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error searching courses", error });
  }
});

module.exports = router;
