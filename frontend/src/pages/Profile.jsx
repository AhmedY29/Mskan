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
import { Link } from "react-router-dom";
import { useState } from "react";

const dsply = ['personal' , 'chat', 'save' ,'list']
export default function Profile() {
    const [displayName, setDisplayName] =useState('personal');
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
            alt="Ahmed"
            src="/static/images/avatar/1.jpg"
          />
          <Typography variant="h6" component="div">
            {" "}
            Ahmed
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
                displayName == 'list' ? <UserProperties/> : displayName == 'save' ? <UserSave/> : displayName == 'chat' ? <UserChat/> : <UserProfile/>
            }
            
          </Card>
        </div>
      </Container>
    </>
  );
}
