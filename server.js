const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB with database 'simple'
mongoose
  .connect("mongodb://localhost/simple", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define Mongoose schema for 'simple1' collection
const todoSchema = new mongoose.Schema(
  {
    title: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "simple1" }
); // Specify the collection name

// Define Mongoose model for 'simple1' collection
const Todo = mongoose.model("Todo", todoSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Fetch all todos from 'simple1' collection
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

// Create a new todo in 'simple1' collection
app.post("/api/todos", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });
  await todo.save();
  res.send(todo);
});

// Delete a todo from 'simple1' collection
app.delete("/api/todos/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.send(result);
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
