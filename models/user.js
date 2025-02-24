const mongoose = require('mongoose');

const golfSchema = new mongoose.Schema({
  course: {
    type: String, 
    required: true,
  }, 
  score: {
    type: Number,
    required: true, 
  },
  holes: {
    type: Number
  },
  notes: {
    type: String,
  },
  difficulty: {
    type: String, 
    enum: ['easy', 'medium', 'hard', 'never again'],
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
  golf: [golfSchema],
});



const User = mongoose.model('User', userSchema);

module.exports = User;
