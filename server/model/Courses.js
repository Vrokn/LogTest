const mongoose = require("mongoose");

const CoursesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructors: {
    type: Array,
    required: true,
    default: [],
  },
  suscriptors: {
    type: Array,
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Courses", CoursesSchema);
