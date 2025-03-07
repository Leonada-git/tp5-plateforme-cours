const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  cours: [{ type: String }],
});

module.exports = mongoose.model('Student', StudentSchema);
