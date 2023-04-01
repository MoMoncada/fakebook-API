//--- Importing modules ---//
const { Schema, model, Types } = require('mongoose');
const { DateTime } = require('luxon');

//--- Schema for reactions (in a nested document) ---//
const reactionSchema = new Schema (
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId() //-- Default value is set to a new ObjectId --//

      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280
        
      },
      username: {
        type: String,
        required: true,

      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => 
        DateTime.fromJSDate(createdAtVal).toLocaleString(DateTime.DATETIME_MED),
      }  
    },
    {
        toJSON: {
            virtuals: true,
            getters: true //--  to include the virtual properties that have a get function in the JSON representation of the document --//
        },
        id: false //-- prevents virtuals from creating duplicates of _id as 'id'--//
    }
);


//--- Schema for Thoughts ---//
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) =>
            DateTime.fromJSDate(createdAtVal).toLocaleString(DateTime.DATETIME_MED)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            //--  Array of nested documents created with the reactionSchema --//
            reactionSchema
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


//--- Calculating the number of reactions a user has ---//
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;