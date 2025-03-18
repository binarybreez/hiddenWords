import mongoose, {Schema} from "mongoose";

export interface Message  {
    _id:mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
    }

const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

export interface User {
    username: string;
    email: string;
    password: string;
    verificationCode: string;
    verificationCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    message: Message[];
}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            "Please enter a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verificationCode: {
        type: String,
        required: [true, "Verification code is required"],
    },
    verificationCodeExpiry: {
        type: Date,
        required: [true, "Verification code expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    message: [messageSchema],
});

const User = mongoose.models.User  || mongoose.model("User", userSchema);
export default User;