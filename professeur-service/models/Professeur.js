const mongoose = require('mongoose');

const ProfesseurSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  bio: { type: String, required: true },
  cours: [{ type: String }],
});

module.exports = mongoose.model('Professeur', ProfesseurSchema);
