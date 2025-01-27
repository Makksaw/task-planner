const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.resolve('./public')));

let tasks = [];

app.get('/', (req, res) => res.sendFile(path.resolve('./index.html')));

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
    const task = { id: Date.now().toString(), ...req.body, completed: false };
    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
    tasks = tasks.map((task) =>
        task.id === req.params.id ? { ...task, completed: true } : task
    );
    res.sendStatus(200);
});

app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter((task) => task.id !== req.params.id);
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Server is running on port: 3000'));
