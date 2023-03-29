const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address"  
            ]
        },
        thoughts: [
            //--_id values referencing the Thought model--//
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            //--_id values referencing the User model (self-reference)--//
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
       toJSON: {
        virtuals: true,
        getters: true //--  to include the virtual properties that have a get function in the JSON representation of the document --//
       },
       id: false //-- prevents virtuals from creating duplicates of _id as 'id'--//
    }
);


userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User, userSchema');


module.exports = User;