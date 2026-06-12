import express from "express";

const router = express.Router();

let posts = [
  {
    id: 1,
    title: "Why Kind of Blue Still Matters",
    category: "Review",
    tag: "Jazz",
    body: "Miles Davis changed everything with this 1959 masterpiece. From the modal approach to the legendary lineup, this album redefined what jazz could be.",
    date: "2026-06-01",
  },
];

let nextId = 2;

// All posts
router.get("/", (req, res) => {
  res.render("posts", { posts });
});

// New post form
router.get("/new", (req, res) => {
  res.render("new-post");
});

// Create post
router.post("/", (req, res) => {
  const { title, category, tag, body } = req.body;
  const newPost = {
    id: nextId++,
    title,
    category,
    tag,
    body,
    date: new Date().toISOString().split("T")[0],
  };
  posts.push(newPost);
  res.redirect("/posts");
});

// Single post
router.get("/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  res.render("post", { post });
});

// Edit form
router.get("/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  res.render("edit-post", { post });
});

// Update post
router.post("/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  const { title, category, tag, body } = req.body;
  post.title = title;
  post.category = category;
  post.tag = tag;
  post.body = body;
  res.redirect(`/posts/${post.id}`);
});

// Delete post
router.post("/:id/delete", (req, res) => {
  posts = posts.filter((p) => p.id !== parseInt(req.params.id));
  res.redirect("/posts");
});

export default router;
