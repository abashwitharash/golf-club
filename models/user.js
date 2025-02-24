const mongoose = require('mongoose');

const golfsSchema = new mongoose.Schema({
  course: {
    type: String, 
    required: true,
  }, 
  score: {
    type: Number,
    required: true, 
  },
  holes: {
    type: Number,
  },
  notes: {
    type: String,
  },
  difficulty: {
    type: String, 
    enum: ['none','easy', 'medium', 'hard', 'never again'],
  },
})


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  golfs: [golfsSchema],
});



const User = mongoose.model('User', userSchema);

module.exports = User;
