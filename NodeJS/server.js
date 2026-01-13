// server.js
const express = require("express");
const path = require("path");
const pty = require("node-pty");

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to your DB engine
const dbPath = path.join(__dirname, "../SqlParser/dbms.exe");

// Spawn DB engine once using a pseudo-terminal
const db = pty.spawn(dbPath, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.cwd(),
  env: process.env
});

console.log("✅ DB engine started and ready!");

// Buffer for DB output
let dbOutput = "";

// Listen for DB engine stdout
db.onData(data => {
  dbOutput += data;
});

// Helper function to send SQL to DB engine
function runSQL(sql, callback) {
  dbOutput = ""; // clear previous output
  db.write(sql + "\r"); // send SQL followed by Enter

  // Wait for DB to respond
  const timeout = setTimeout(() => {
    if (!dbOutput.trim()) {
      callback("No response from DB engine", null);
    } else {
      // Remove DB prompt and extra whitespace
      const result = dbOutput.replace(/postgres=#/g, '').trim();
      callback(null, result);
    }
  }, 300); // increase if DB is slow
}

// Create table on server start (if not exists)
runSQL("create table if not exists mwa (id int primary key);", (err) => {
  if (err) console.error("❌ Failed to create table:", err);
  else console.log("✅ Table 'mwa' is ready!");
});

// GET all rows from mwa
app.get("/mwa", (req, res) => {
  runSQL("select id from mwa;", (err, result) => {
    if (err) return res.status(500).json({ error: err });

    // Split output into lines, trim whitespace
    const lines = result
      .split("\n")
      .map(line => line.trim())
      .filter(line => line && line !== "postgres=#"); // ignore empty lines and prompts

    // Map each line to an object with 'id', use null if not a number
    const rows = lines.map(line => {
      const num = parseInt(line);
      return { id: isNaN(num) ? null : num };
    });

    res.json({ data: rows });
  });
});


// INSERT a new row into mwa
app.post("/mwa", (req, res) => {
  const { id } = req.body;
  if (id === undefined) return res.status(400).json({ error: "id is required" });

  runSQL(`insert into mwa values(${id});`, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Inserted successfully" });
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});
