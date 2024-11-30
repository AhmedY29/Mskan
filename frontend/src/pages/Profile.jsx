import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UserProfile from "../components/UserProfile";
import UserProperties from "../components/UserProperties";
import UserSave from "../components/UserSave";
import UserChat from "../components/UserChat";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {  useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/Loading";

export default function Profile() {
    const [displayName, setDisplayName] =useState('personal');
    const {name} = useParams()
    const navigate = useNavigate()
    
    const { isLoading , user } = useAuthStore();

    useEffect(() => {
      if (user.name !== name ){
        navigate(`/profile/${user.name}`)
      }
    }, [user , name])
    

    if(isLoading){<Loading/>}
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
            alt={user.name}
            src={user.avatar || ''}
          />
          <Typography variant="h6" component="div">
            {" "}
            {user.name}
          </Typography>
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
            <Button onClick={()=> setDisplayName('personal')}>المعلومات الشخصية</Button>
            <Button onClick={()=> setDisplayName('list')}>العقارات </Button>
            <Button onClick={()=> setDisplayName('save')}>العقارات المحفوظة</Button>
            <Button onClick={()=> setDisplayName('chat')}>المحادثات</Button>
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
                displayName == 'list' ? <UserProperties user={user}/> : displayName == 'save' ? <UserSave/> : displayName == 'chat' ? <UserChat/> : <UserProfile user={user}/>
            }
            
          </Card>
        </div>
      </Container>
    </>
  );
}
