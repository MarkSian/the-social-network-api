//imports 
import mongoose, { Schema, Document } from 'mongoose';
//schema set up for thoughts and reactions


const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User', userSchema);

export default User;