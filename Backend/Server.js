import express from 'express';
import mongoose from 'mongoose';
import url from './Config.js'// i have'nt learned how to use .env so i'll just add the 
//Config.js file to git ignore

const app = express();
const port = 4001;

// Connect to MongoDB Atlas
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Task model
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

// API endpoints
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.put('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate((url), req.body, { new: true });
  res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndRemove((url));
  res.json({ message: 'Task deleted' });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});