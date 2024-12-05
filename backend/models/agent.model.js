import mongoose, { Mongoose, Schema } from "mongoose";

const agent = new mongoose.Schema({
   name: {
    type: String
   },
   description: {
    type: String
   },
   location: {
    type: [String]
   },
   avatar:{
    type: String,
    default: "",
   },
   license:{
    type: Number
   },
   employees:[
    {
        userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    role:{
        type: String,
        default: 'employee'
    }
    }
    ]
},{
    timestamps: true
});

const Agent = mongoose.model("Agent", agent);
export default Agent;