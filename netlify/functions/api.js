import express from "express";
import serverless from "serverless-http";
import postsRouter from "../../routes/posts.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

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
