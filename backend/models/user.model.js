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
    },
    avatar:{
        type: String
    },
    license:{
        type: String,

    },
    address:{
        type: String,
    },
    agent_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent'
    },
    role:{
        type: String,
        enum: ['client', 'admin'],
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
