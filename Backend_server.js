//Backend server is running on http://localhost:3000
//API is running at http://localhost:4000

//This is Backend Server(3000) Using my API from Port(4000)
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
//My API is running at Port 4000
const API_URL = "http://localhost:4000";

//Using Public folder STATIC files
app.use(express.static("public"));

//Body Parser Middleware to access body of Frontend 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Route to render the Main page: http://localhost:4000/posts
//GET Req
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

//Route to render the Edit page
//New Post
//GET Req
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "CREATE POST" });
});

//Edit Post
//GET Req
app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "UPDATE POST",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in fetching post" });
  }
});

//Creating a NEW Post
//POST Req
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

//Partially Update a post (EDIT)
//PATCH Req
app.post("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

//Delete a post
//DELETE Req
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error in deleting post" });
  }
});

//Running
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
//By Vansh Sikka

