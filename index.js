const express = require('express');
const Todo = require('./models/todomodel');
const app = express();
const port = 3000;
app.use(express.json());

var todos = [
    new Todo(1, 'Create UI', 'Create a UI for the TODO App'),
    new Todo(2, 'Create API', 'Create an API for the TODO App'),
    new Todo(3, 'Create Database', 'Create a Database for the TODO App'),
    new Todo(4, 'Deploy App', 'Deploy the App to a cloud platform'),
];


// get all todos
app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

// Read a specific todo by id
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    res.status(200).json(todo);
});


// Create a new todo
app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    console.log("title:", title);
    console.log("description:", description);
    if (title === undefined || description === undefined) {
        return res.status(400).send('Invalid input');
    }
    const newTodo = new Todo(
        todos.length + 1,
        title,
        description,
    );
    todos.push(newTodo);
    res.status(201).json("Todo created successfully");
});

// Update a todo
// Update an existing todo by id
app.put('/todos/:id', (req, res) => {
    const { title, description } = req.body;
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    res.status(200).json("Updated the todo successfully");
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).send('Todo not found');
    const deletedTodo = todos.splice(todoIndex, 1);
    res.status(200).json("Delete todo successfully");
});



app.get('/', (req, res) => {
    res.json("Welcome to Our TODO App");
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:3000`);
});


