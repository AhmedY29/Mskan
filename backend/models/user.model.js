import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        unique: true
    },
    avatar:{
        type: String
    },
    license:{
        type: String,
        unique: true

    },
    address:{
        type: String,
    },
    agent_Id:{
        type: String
    },
    role:{
        type: String,
        enum: ['client', 'agent'],
        default: 'client'
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date,
    verificationToken: String,
    verificationTokenExpired: Date,
}, {
    timestamps: true 
});

const User = mongoose.model("User", userSchema);

export default User;