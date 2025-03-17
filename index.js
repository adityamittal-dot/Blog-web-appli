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

// Single Blog Post Route
app.get("/post/:id", (req, res) => {
    const blog = blogs.find((b) => b.id == req.params.id);
    if (blog) {
        res.render("post", { blog });
    } else {
        res.send("Post Not Found");
    }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
