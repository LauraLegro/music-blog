import express from "express";
import postsRouter from "./routes/posts.js";

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Music blog running on port ${PORT}`);
});

export default app;
