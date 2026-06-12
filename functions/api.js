// netlify/functions/api.js  ← put the file here!

const express = require("express");
const serverless = require("serverless-http");
const postsRouter = require("../../routes/posts.js"); // adjust path as needed

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.render("index");
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

// Export for Netlify — no app.listen()
module.exports.handler = serverless(app);

// Export for local testing
module.exports.app = app;

// Export for local testing
module.exports.run = (event, context) => {
  return serverless(app)(event, context);
};
