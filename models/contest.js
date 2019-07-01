
const mongoose = require("mongoose");

// use mongo schema as Schema
const Schema = mongoose.Schema;

const ContestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  problems :
  [
      {
        problem:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'problem'
        },        
        color: {
            type: String,
            required: false
        },
            solvers :[
                {
                
        solver :{type:Schema.Types.ObjectId,
        required:true,
        ref:'user'},
        time:{
            type:Date,
            require:true
        }

    }
        ]


    }
    ],
    users :[
        {
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'}
    ],
    owner:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }
    ,
    contesttime:{
        start:{
            type:Date,
            require:true
        },
        end:{
            type:Date,
            require:true
        }
    }
    
});

module.exports = contest = mongoose.model("contest", ContestSchema);
