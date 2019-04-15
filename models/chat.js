const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ChatSchema = new Schema({
    members : [
        {
            userID : {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required : true
            },
            lastVisit: {
                type: Date
            },
            Seen: {
                type: Boolean
            }
        }
    ],
    messages : [
        {
            text: {
                type: String,
                required : true
            },
            senderID: {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required : true
            },
            sendDate:{
                type: Date,
                default: Date.now()
            },
            deletedFrom: [
                {
                    delID : {
                        type: Schema.Types.ObjectId,
                        ref: 'users'
                    }
                }
            ],
        }
    ]
});

module.exports = Chat = mongoose.model('chats', UserSchema);

