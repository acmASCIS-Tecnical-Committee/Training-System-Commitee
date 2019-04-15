const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    handles: [
        {
            judge: {
                type: String
            },
            handle: {
                type: String
            }
        }
    ],
    email: {
        type: String,
        required : true
    },
    phoneNumber:{
        type: String,
        required : true
    },
    problemsCount:{
        type: int
    },
    password:{
        type: String,
        required : true
    },
    role:{
        type: String
    },
    mentor:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    avatar:{
        type: String
    },
    lastOnline:[
        {
            judge: {
                type: String
            },
            lastVisit: {
                type: Date
            }
        }
    ],
    freeTime: [
        {
            from:{
                type: Date
            },
            to:{
                type: Date
            },
            available:{
                type: Boolean
            }
        }
    ],
    registrationDate:{
        type: Date,
        default: Date.now()
    },
    confirmation:{
        type: Boolean
    }
});

module.exports = User = mongoose.model('users', UserSchema);

