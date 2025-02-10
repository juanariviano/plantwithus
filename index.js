import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import multer from "multer";
import path from "path";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "plantwithus",
  password: "babiliar",
  port: 4000,
});

db.connect();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get("/", async (req, res) => {
  res.render("index.ejs", {});
});

app.get("/create", async (req, res) => {
  res.render("create.ejs", {});
});

app.post("/create", upload.single('file'), async (req, res) => {
  const { firstname, lastname, email, targetmoney, additionalnotes } = req.body;
  const filePath = req.file ? req.file.path : null;

  try {
    await db.query(
      "INSERT INTO event (first_name, last_name, email, target_money, proposal_file, additional_notes) VALUES ($1, $2, $3, $4, $5, $6)",
      [firstname, lastname, email, targetmoney, filePath, additionalnotes]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting data into database");
  }
});

app.get("/history", async (req, res) => {
  res.render("history.ejs", {});
});

app.get("/archive", async (req, res) => {
  res.render("archive.ejs", {});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
