import cloudinary from "../config/cloudinary.js"
import Agent from "../models/agent.model.js";
import User from "../models/user.model.js";

export const getAgents = async (req, res) => {
    try {
      // جلب جميع الوكلاء من قاعدة البيانات
      const agents = await Agent.find(); 
  
      // التحقق إذا كانت البيانات موجودة
      if (!agents) {
        return res.status(404).json({ message: "No agents found" });
      }
  
      // إرسال الوكلاء في الاستجابة
      res.status(200).json({ agents });
    } catch (error) {
      // إذا حدث خطأ أثناء تنفيذ الاستعلام
      res.status(500).json({ error: error.message });
    }
  }; 
  
export const addAgent = async (req, res) => {
    try {
      const { name, description, location, avatar, license } = req.body;
      const userId = req.userId
      let avatarUrl = "";
      

      if (avatar) {
          const avatarResult = await cloudinary.uploader.upload(avatar, {
            folder: name,
          });
          avatarUrl = avatarResult.secure_url;
        }
      const newAgent = await Agent.create({
        name,
        description,
        location,
        avatar: avatarUrl,
        license,
        employees: [
            {
              userId,
              role: "owner", 
            },
          ],
      });
      const updatedUser = await User.findByIdAndUpdate(
        userId, 
        { agent_Id: newAgent._id },  // إضافة agentId إلى الـ User
        { new: true }  // إرجاع النسخة المعدلة من الـ User
      );
  
      res.status(201).json({ message: "Agent created successfully", agent: newAgent });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const editAgent = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedAgent = await Agent.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
  
      if (!updatedAgent) {
        return res.status(404).json({ message: "Agent not found" });
      }
  
      res.status(200).json({ message: "Agent updated successfully", agent: updatedAgent });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const deleteAgent = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedAgent = await Agent.findByIdAndDelete(id);
  
      if (!deletedAgent) {
        return res.status(404).json({ message: "Agent not found" });
      }
  
      res.status(200).json({ message: "Agent deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const addEmpToAgent = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, role } = req.body;
      const agent = await Agent.findById(id);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      const username = await User.findOne({name})
      if (!username) {
        return res.status(404).json({ message: "User not found" });
      }
      const userId = username._id
      const userInAgent = await User.findById(userId) 
      console.log(userInAgent)
      console.log(userInAgent.agent_Id)
      if(!(userInAgent.agent_Id == undefined || userInAgent.agent_Id == '')){
        return res
        .status(400)
        .json({ success: false, message: "المستخدم موجود في شركة بالفعل" });
      }
  
      agent.employees.push({ userId, role });
      await User.findByIdAndUpdate(userId, { agent_Id: agent._id },{ new: true });
      await agent.save();
  
      res.status(201).json({ message: "Employee added successfully", agent });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const editEmpInAgent = async (req, res) => {
    try {
      const { agentId, employeeId } = req.params;
      const { role } = req.body;
  
      const agent = await Agent.findById(agentId);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
  
      const employee = agent.employees.id(employeeId); // البحث عن الموظف
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      employee.role = role; // تحديث الدور
      await agent.save();
  
      res.status(200).json({ message: "Employee updated successfully", agent });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
export const removeEmpFromAgent = async (req, res) => {
    try {
      const { agentId, employeeId } = req.params;

  
      const agent = await Agent.findById(agentId);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
          // العثور على الموظف في قائمة الموظفين
    const employee = agent.employees.find(emp => emp._id.toString() === employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // استخراج userId من الموظف
    const userId = employee.userId;
  
      agent.employees.pull({ _id: employeeId });
      await User.findByIdAndUpdate(userId, {agent_Id: null}, { new: true, runValidators: true });
      await agent.save();
  
      res.status(200).json({ message: "Employee removed successfully", agent });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export const getAgent = async (req, res) => {
    try {
      const { name } = req.params;  // الحصول على الاسم من المعاملات في URL
  
      // البحث عن الوكيل باستخدام الاسم
      const agent = await Agent.findOne({ name }).populate({
        path: 'employees',
        populate: {
          path: 'userId',
          select: '-password',
        },
      });
  
      // التحقق إذا كان الوكيل موجودًا
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
  
      // إرسال الوكيل في الاستجابة
      res.status(200).json({ agent });
    } catch (error) {
      // في حال حدوث خطأ
      res.status(500).json({ error: error.message });
    }
  };