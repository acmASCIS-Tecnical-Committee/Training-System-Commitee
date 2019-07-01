
const mongoose = require("mongoose");

// use mongo schema as Schema
const Schema = mongoose.Schema;

const onlineJudjeSchema = new Schema({
  name: {
    type: String,
    required: true
  },link: {
    type: String,
    required: true
  }
});

module.exports = onlineJudje = mongoose.model("onlineJudje", onlineJudjeSchema);
