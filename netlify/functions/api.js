import express from "express";
import serverless from "serverless-http";
import path from "path";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(process.cwd(), "public")));
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), "views"));

const postsRouter = express.Router();

let posts = [
  {
    id: 1,
    title: "Why Kind of Blue Still Matters",
    category: "Review",
    tag: "Jazz",
    body: "Miles Davis changed everything with this 1959 masterpiece.",
    date: "2026-06-01",
  },
];

let nextId = 2;

postsRouter.get("/", (req, res) => res.render("posts", { posts }));
postsRouter.get("/new", (req, res) => res.render("new-post"));
postsRouter.post("/", (req, res) => {
  const { title, category, tag, body } = req.body;
  posts.push({
    id: nextId++,
    title,
    category,
    tag,
    body,
    date: new Date().toISOString().split("T")[0],
  });
  res.redirect("/posts");
});
postsRouter.get("/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  res.render("post", { post });
});
postsRouter.get("/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  res.render("edit-post", { post });
});
postsRouter.post("/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  const { title, category, tag, body } = req.body;
  Object.assign(post, { title, category, tag, body });
  res.redirect(`/posts/${post.id}`);
});
postsRouter.post("/:id/delete", (req, res) => {
  posts = posts.filter((p) => p.id !== parseInt(req.params.id));
  res.redirect("/posts");
});

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
