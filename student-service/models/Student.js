const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, 
  name: { type: String, required: true },
  email: { type: String, required: true },
  cours: [{ type: String }],
});
StudentSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastProf = await this.constructor.findOne().sort({ id: -1 });
    this.id = lastProf ? lastProf.id + 1 : 1; 
  }
  next();
});
module.exports = mongoose.model('Student', StudentSchema);
