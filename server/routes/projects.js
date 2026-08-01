import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// GET /api/projects - list all projects, ordered
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// POST /api/projects - add a new project
router.post("/", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: "Failed to create project" });
  }
});

export default router;
