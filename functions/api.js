import express from "express";
import postsRouter from "./routes/posts.js";
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.render("index");
});
// Define your backend routes here
router.get("/routes/posts.js", (req, res) => {
  res.json({ message: "Hello from your Express backend on Netlify!" });
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Contact form submitted: ${name} (${email}) - ${message}`);
  res.render("contact", { success: true });
});

// app.listen(PORT, () => {
//   console.log(`Music blog running on port ${PORT}`);
// });

export default app;

// const express = require("express");

// CRITICAL: Path prefix must match your function name or redirect rule
app.use("/.netlify/functions/api", router);

// DO NOT USE app.listen(). Instead, export the wrapped handler:
module.exports.handler = serverless(app);
