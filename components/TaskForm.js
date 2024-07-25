"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, updateTask } from '../store/taskSlice';

const TaskForm = ({ task }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await dispatch(updateTask({ id: task._id, task: { title, description } })).unwrap();
      } else {
        await dispatch(createTask({ title, description })).unwrap();
      }
      setTitle('');
      setDescription('');
    } catch (error) {
      alert('Error occurred: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
      />
      <button type="submit">{task ? 'Update' : 'Add'} Task</button>
    </form>
  );
};

export default TaskForm;
