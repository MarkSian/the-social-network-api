"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//schema set up for thoughts and reactions
//Reaction Schema
const reactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
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
        get: (Timestamp) => new Date(Timestamp).toLocaleString(),
    },
});
//Thought Schema
const thoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (Timestamp) => new Date(Timestamp).toLocaleString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
//get total count of reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
//create thought model
const Thought = (0, mongoose_1.model)('Thought', thoughtSchema);
//export thought model
exports.default = Thought;
