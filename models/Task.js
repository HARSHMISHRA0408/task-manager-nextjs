const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.models.Task || mongoose.model('Task', TaskSchema);
