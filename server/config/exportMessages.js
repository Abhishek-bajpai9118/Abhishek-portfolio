import dotenv from "dotenv";
import xlsx from "xlsx";
import { connectDB } from "./db.js";
import Message from "../models/Message.js";

dotenv.config();

const run = async () => {
  await connectDB();

  const messages = await Message.find().sort({ createdAt: -1 }).lean();

  if (messages.length === 0) {
    console.log("No messages found yet — nothing to export.");
    process.exit(0);
  }

  const rows = messages.map((m) => ({
    Name: m.name,
    Email: m.email,
    Message: m.message,
    "Submitted At": new Date(m.createdAt).toLocaleString(),
  }));

  const worksheet = xlsx.utils.json_to_sheet(rows);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Messages");

  worksheet["!cols"] = [
    { wch: 20 },
    { wch: 28 },
    { wch: 50 },
    { wch: 22 },
  ];

  const outPath = "./contact-messages.xlsx";
  xlsx.writeFile(workbook, outPath);

  console.log(`Exported ${messages.length} message(s) to ${outPath}`);
  process.exit(0);
};

run();