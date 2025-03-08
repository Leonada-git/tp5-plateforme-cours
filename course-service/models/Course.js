const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  titre: { type: String, required: true },
  professeur_id: { type: Number, required: true },
  description: { type: String, required: true },
  prix: { type: Number, required: true },
});
CourseSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastProf = await this.constructor.findOne().sort({ id: -1 });
    this.id = lastProf ? lastProf.id + 1 : 1; 
  }
  next();
});
module.exports = mongoose.model('Course', CourseSchema);
