import dbConnect from '../../../../lib/dbConnect';
import Task from '../../../../models/Task';

export async function PUT(req, res) {
  const { id } = req.query;
  await dbConnect();
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ success: false });
  }
}

export async function DELETE(req, res) {
  const { id } = req.query;
  await dbConnect();
  try {
    const deletedTask = await Task.deleteOne({ _id: id });
    if (!deletedTask) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
}
