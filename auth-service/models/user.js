const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: Number, unique: true },  
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastUser = await this.constructor.findOne().sort({ id: -1 });
    this.id = lastUser ? lastUser.id + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
