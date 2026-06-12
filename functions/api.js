// netlify/functions/api.js  ← put the file here!

import express, { urlencoded, static } from "express";
import serverless from "serverless-http";
import postsRouter from "../../routes/posts.js"; // adjust path as needed

const app = express();

app.use(urlencoded({ extended: true }));
app.use(static("public"));

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

export const handler = serverless(app);

// Export for local testing
const _app = app;
export { _app as app };

// Export for local testing
export function run(event, context) {
  return serverless(app)(event, context);
}
