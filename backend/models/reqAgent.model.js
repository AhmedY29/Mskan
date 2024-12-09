import mongoose from "mongoose"

const reqAgent = new mongoose.Schema({
    agent_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    confirm:{
        type: Boolean
    }
},{
    timestamps:true
})

const ReqAgent = mongoose.model('ReqAgent',reqAgent);

export default ReqAgent;