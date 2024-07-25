import dbConnect from '../../../lib/dbConnect';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'PUT':
      try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
      } catch (error) {
        res.status(400).json({ message: 'Failed to update task', error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
          return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
      } catch (error) {
        res.status(400).json({ message: 'Failed to delete task', error: error.message });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}
