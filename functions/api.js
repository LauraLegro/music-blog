const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

// Define your backend routes here
router.get("/routes/posts.js", (req, res) => {
  res.json({ message: "Hello from your Express backend on Netlify!" });
});

// CRITICAL: Path prefix must match your function name or redirect rule
app.use("/.netlify/functions/api", router);

// DO NOT USE app.listen(). Instead, export the wrapped handler:
module.exports.handler = serverless(app);
