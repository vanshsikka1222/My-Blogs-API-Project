//My own BLOG API 
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

//In-memory Data Store
let posts = [
  {
    id: 1,
    title: "The Power of Positive Connections",
    content:
      "At the heart of a happy life is the power of positive connections with those around us. Whether it's family, friends, or a significant other, fostering strong relationships creates a support system that can weather life's storms. Take time to nurture these connections, cherish the moments, and build a network of love that adds richness to your journey.",
    author: "Vansh Sikka",
    date: "2024-02-17T10:00:00Z",
  },
  {
    id: 2,
    title: "Embracing the Unknown",
    content:
      "Traveling is not just about reaching a destination; it's about embracing the unknown. Stepping outside of your comfort zone and immersing yourself in unfamiliar surroundings fosters adaptability and resilience. The challenges of navigating a new place can lead to personal growth, providing valuable lessons that contribute to a more fulfilling life.",
    author: "Vansh Sikka",
    date: "2024-02-17T14:30:00Z",
  },
  {
    id: 3,
    title: "Romantic Love: A Journey of Shared Dreams",
    content:
      "Romantic love is a captivating journey where two souls intertwine in a dance of shared dreams, mutual support, and genuine companionship. It's about finding someone with whom you can celebrate victories, weather storms, and grow together. A happy romantic relationship thrives on communication, trust, and the willingness to embark on the adventure of life side by side.",
    author: "Vansh",
    date: "2024-02-17T09:15:00Z",
  },
];

//Hold on total number of POSTS in Array 
let lastId = 3;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//RESTful API operations: 

//GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

//GET a specific post by id
app.get("/posts/:id", (req, res) => {
  //Using in built find function that finds particular post.id from all posts array
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  } else {
    res.json(post);
  }
});

//POST a new post
app.post("/posts", (req, res) => {
  //Updating Counter
  const newId = lastId += 1;
  //New Post
  const post = {
    id: newId,
    //From Body (Frontend)
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    //Real Time date & time
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

//PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  if (req.body.title) {
    post.title = req.body.title;
  }
  if (req.body.content) {
    post.content = req.body.content;
  } 
  if (req.body.author) {
    post.author = req.body.author;
  }
  res.json(post);
});

//DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }
  //Splice: Deletes (from where to delete, how much to delete)
  posts.splice(index, 1);
  res.json({ message: "Post deleted successfully" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
//By Vansh Sikka