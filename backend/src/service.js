const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("log"), async (req, res) => {
  const fs = require("fs");
  const logData = fs.readFileSync(req.file.path, "utf-8");

  try {
    const aiRes = await axios.post("http://localhost:8000/analyze", {
      log: logData,
    });

    res.json(aiRes.data);
  } catch (err) {
    res.status(500).json({ error: "AI service failed" });
  }
});

app.listen(5000, () => console.log("Backend running on 5000"));