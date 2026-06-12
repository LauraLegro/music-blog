// netlify/functions/api.js  ← put the file here!

import express from "express";
import serverless from "serverless-http";
import postsRouter from "../../routes/posts.js"; // adjust path as needed
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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

// Export for local testing
// const _app = app;
// export { _app as app };

// // Export for local testing
// export function run(event, context) {
//   return serverless(app)(event, context);
// }
export const handler = serverless(app);
