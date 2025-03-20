import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Set up Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

// Sample blog data
const blogs = [
    { id: 1, title: "Mastering Node.js", content: "Node.js is a runtime for JavaScript...", image: "/images/nodejs.jpg" },
    { id: 2, title: "Exploring Express.js", content: "Express.js simplifies server-side web applications...", image: "/images/express.jpg" },
    { id: 3, title: "Understanding MongoDB", content: "MongoDB is a NoSQL database...", image: "/images/mongodb.jpg" }
];

app.get("/", (req, res) => {
    res.render("blog", { blogs });
});

const getPosts = () => {
    const data = fs.readFileSync(postsFilePath, 'utf-8');
    return JSON.parse(data);
  };
  
  // Helper function to save posts
  const savePosts = (posts) => {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
  };
  
  // Home Page - View all posts
  app.get('/', (req, res) => {
    const posts = getPosts();
    res.render('home', { posts });
  });
  
  // New Post Form
  app.get('/posts/new', (req, res) => {
    res.render('new');
  });
  
  // Create Post
  app.post('/posts', (req, res) => {
    const posts = getPosts();
    const newPost = { id: Date.now(), title: req.body.title, content: req.body.content };
    posts.push(newPost);
    savePosts(posts);
    res.redirect('/');
  });
  
  // Show Post
  app.get('/posts/:id', (req, res) => {
    const posts = getPosts();
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.render('show', { post });
  });
  
  // Edit Post Form
  app.get('/posts/:id/edit', (req, res) => {
    const posts = getPosts();
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.render('edit', { post });
  });
  
  // Update Post
  app.put('/posts/:id', (req, res) => {
    let posts = getPosts();
    posts = posts.map(post =>
      post.id == req.params.id ? { ...post, title: req.body.title, content: req.body.content } : post
    );
    savePosts(posts);
    res.redirect('/');
  });
  
  // Delete Post
  app.delete('/posts/:id', (req, res) => {
    let posts = getPosts();
    posts = posts.filter(post => post.id != req.params.id);
    savePosts(posts);
    res.redirect('/');
  });
  

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
