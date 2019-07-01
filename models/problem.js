
const mongoose = require("mongoose");

// use mongo schema as Schema
const Schema = mongoose.Schema;

const ProblemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }, 
  judje:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'onlineJudje'
  },
    numberOfSolving: {
    type: Number,
    required: false
  }
});

module.exports = problem = mongoose.model("problem", ProblemSchema);
