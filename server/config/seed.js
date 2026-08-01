import dotenv from "dotenv";
import { connectDB } from "./db.js";
import Project from "../models/Project.js";

dotenv.config();

const sampleProjects = [
  {
    title: "Resume Screener",
    description:
      "An NLP pipeline that parses resumes and ranks candidates against a job description using embeddings and cosine similarity.",
    tags: ["Python", "NLP", "FastAPI", "React"],
    githubUrl: "https://github.com/your-username/resume-screener",
    liveUrl: "",
    order: 1,
  },
  {
    title: "Realtime Chat with AI Assistant",
    description:
      "A MERN chat app with a built-in AI assistant using the OpenAI/Anthropic API and Socket.IO for live messaging.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Socket.IO"],
    githubUrl: "https://github.com/your-username/ai-chat-app",
    liveUrl: "",
    order: 2,
  },
  {
    title: "Image Classifier Dashboard",
    description:
      "A dashboard to train and evaluate a CNN image classifier, with live accuracy/loss charts and a drag-and-drop test panel.",
    tags: ["TensorFlow", "React", "Flask", "Chart.js"],
    githubUrl: "https://github.com/your-username/image-classifier-dashboard",
    liveUrl: "",
    order: 3,
  },
];

const run = async () => {
  await connectDB();
  await Project.deleteMany({});
  await Project.insertMany(sampleProjects);
  console.log("Sample projects seeded.");
  process.exit(0);
};

run();
