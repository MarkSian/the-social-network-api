//imports 
import { Timestamp } from 'bson';
import { Schema, model, Types } from 'mongoose';
//schema set up for thoughts and reactions

//Reaction Schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => new Date(timestamp).toDateString(),
    },
});

//Thought Schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (Timestamp: Date) => new Date(Timestamp).toDateString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//get total count of reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});



//create thought model
const Thought = model('Thought', thoughtSchema);

//export thought model
export default Thought;