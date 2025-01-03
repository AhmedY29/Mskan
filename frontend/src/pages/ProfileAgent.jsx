import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from '@mui/material/Grid2'
import UserProfile from "../components/UserProfile";
import UserProperties from "../components/UserProperties";
import UserSave from "../components/UserSave";
import UserChat from "../components/UserChat";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {  useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import AgentProfile from "../components/AgentProfile";
import AgentEmp from "../components/AgentEmp";
import { useAgentStore } from "../store/agentStore";
import AgentProperties from "../components/AgentProperties";

export default function ProfileAgent() {
    const [displayName, setDisplayName] =useState('personal');
    const [open, setOpen] =useState(false);
    const [loading, setLoading] =useState(true);
    const [users, setUsers] =useState(false);
    const [agents, setAgents] = useState({
      name: "",
      address: "",
      description: "",
      license: "",
      avatar:'',
      employees:[],
    });
    const {name} = useParams()
    const { user} = useAuthStore();
    const { getAgent , agent , isLoading , deleteEmpFromAgent} = useAgentStore();


    useEffect(() => {

      const fetchAgentData = async () => {
        try {
    
          // التأكد من أن `name` موجود قبل إجراء الطلب
          if (!name) {
            console.error('Name is not defined');
            return;
          }
          // جلب بيانات الوكيل
          getAgent(name);

          // تحديث الحالات
          setUsers(agent.employees);
          setAgents(agent);
          

          
        } catch (error) {
          console.error('Error fetching agent data:', error);
          toast.error('حدث خطأ أثناء جلب البيانات. حاول لاحقًا.');
        } finally {

          
          setOpen(false);
        }
      };
      
      fetchAgentData();
    },[name])
    useEffect(() => {
      if (!user) {
        return; 
      }
    
      console.log(user, '0');

      if (!agent.name) {
        getAgent(name);
        console.log(agent ,'Agent')
        return; 
      }
    
      if (!user.agent_Id) {
        toast.error('لا يوجد لديك شركة عقارية');
        return navigate('/');
      }
    
    console.log(user.agent_Id?.name != agent?.name)
    console.log('agent name:',agent?.name)
    console.log('agent emp:',agent.employees.map(emp => emp).filter(emp => emp.userId._id == user._id).map(emp => emp._id))
    console.log('agent name from user:',user.agent_Id?.name)
      if (user.agent_Id?.name != agent?.name) {
        console.log('un' , user.agent_Id.name , 'an' ,agent)
        toast.error('لست في هذه الشركة العقارية');
        console.log(user, '1');
        return navigate('/'); // قم بإعادة التوجيه إذا لم يكن اسم الوكيل يطابق
      } else {
        // toast.success('تم التأكد من هويتك');
        console.log(user, '2');
        setLoading(false); // إنهاء التحميل
      }
    
      console.log(user, '3');
    }, [user , getAgent , isLoading])
    
    const navigate = useNavigate()
    
    if(loading){return <Loading/>}
    const idEmp = agent.employees.map(emp => emp).filter(emp => emp.userId._id == user._id).map(emp => emp._id)
    console.log(idEmp)

  return (
    <>
      <Container fixed>
        <h1>الملف الشخصي</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{ width: 70, height: 70 }}
            alt={agent.name}
            src={agent.avatar || ''}
          />
          <Typography variant="h6" component="div">
            {" "}
            {agent.name}
          </Typography>
          <Typography variant="p" component="div">
            شركة عقارية
          </Typography>
          <Button onClick={() => {
            deleteEmpFromAgent(agent._id , idEmp)
            navigate(`/`)
          }} variant="outlined" color="error">مغادرة الشركة</Button>
          <Stack
            sx={{
              marginTop: "30px",
              border: "1px solid black ",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              width: "85%",
            }}
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Button onClick={()=> setDisplayName('personal')}>المعلومات العامة</Button>
            <Button onClick={()=> setDisplayName('list')}>العقارات </Button>
            <Button onClick={()=> setDisplayName('emp')}>الموظفين</Button>
            {/* <Button onClick={()=> setDisplayName('chat')}>المحادثات</Button> */}
          </Stack>
          <Card
            sx={{
              minWidth: 275,
              backgroundColor: "#F6F6F6",
              marginTop: "30px",
              width: "85%",
            }}
          >
                
            

            {
                displayName == 'emp' ? <AgentEmp/> : displayName == 'list' ? <AgentProperties/> : <AgentProfile agent={agent}/>
            }
            
          </Card>
            </div>
          
      </Container>
    </>
  );
}
