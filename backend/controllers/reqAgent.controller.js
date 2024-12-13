import Agent from "../models/agent.model.js";
import ReqAgent from "../models/reqAgent.model.js";
import User from "../models/user.model.js";
export const getAllReq = async (req , res)=>{
    try {
        const requests = await ReqAgent.find({}).populate('agent_Id')
        res.status(200).json({success: true, data: requests});
    } catch (error) {
        
    }
}
export const addReq = async (req, res) => {
    try {
      const { agent_Id, name } = req.body;
      const user = await User.findOne({name});
      const userId = user._id
      
      const newReqAgent = new ReqAgent({
        agent_Id,
        userId,
      });
  
      await newReqAgent.save();
  
      res.status(201).json({ message: "Request agent added successfully!", newReqAgent });
    } catch (error) {
      res.status(500).json({ message: "Failed to add request agent", error });
    }
  };


// Update the `confirm` field and handle actions based on the updated value
export const putReq = async (req, res) => {
  const { id } = req.params; // reqAgent ID
  try {
    const { confirm } = req.body; // New confirm value
    console.log(id)
    console.log(confirm)
    // Find the reqAgent by ID
    const reqAgent = await ReqAgent.findById(id);
    if (!reqAgent) {
      return res.status(404).json({ message: "Request agent not found!" });
    }

    // Update the confirm field
    reqAgent.confirm = confirm;
    await reqAgent.save(); // Save the updated document

    // Perform actions based on the updated confirm value
    if (reqAgent.confirm) {
      // If confirm is true, update the user's agent_Id
      const user = await User.findById(reqAgent.userId);
      const agent = await Agent.findById(reqAgent.agent_Id);
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      agent.employees.push({
        userId: user._id,
      });
      user.agent_Id = reqAgent.agent_Id;
      await user.save();
      await agent.save();
    }
    await ReqAgent.findByIdAndDelete(id);

    return res.status(200).json({
      message: reqAgent.confirm
        ? "Request confirmed and user updated successfully."
        : "Request rejected and deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update confirm field", error });
  }
};