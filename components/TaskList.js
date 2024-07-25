"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../store/taskSlice';
import TaskForm from './TaskForm';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskStatus = useSelector((state) => state.tasks.status);

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
    } catch (error) {
      alert('Error occurred: ' + error.message);
    }
  };

  return (
    <div>
      <TaskForm />
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
            <TaskForm task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
