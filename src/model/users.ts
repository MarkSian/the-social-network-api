//imports 
import mongoose, { Schema, Document } from 'mongoose';

//interface for User
interface IUser extends Document {
    name: string;
    email: string;
    thoughts: mongoose.Types.ObjectId[];
    friends: mongoose.Types.ObjectId[];
    

}

//Schema for User
const UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User' //self-reference?
            }
        ]
   },
);

//create user model
const User = mongoose.model<IUser>('User', UserSchema);

//export user model
export default User;