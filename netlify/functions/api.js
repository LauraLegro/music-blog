import express from "express";
import serverless from "serverless-http";
import postsRouter from "../../routes/posts.js";
import { fileURLToPath } from "url";
import path from "path";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, "../../public")));
app.set("view engine", "ejs");
app.set("views", path.join(_dirname, "../../views"));

app.use("/posts", postsRouter);

app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Contact form submitted: ${name} (${email}) - ${message}`);
  res.render("contact", { success: true });
});

export const handler = serverless(app);
