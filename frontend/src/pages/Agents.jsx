import { useEffect } from "react";
import Loading from "../components/Loading";
import { useAgentStore } from "../store/agentStore"
import AgentCard from "../components/AgentCard";
import Grid from "@mui/material/Grid2";
import { Container, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Agents (){
    const { agents , getAgents ,  isLoading } =useAgentStore();
    useEffect(()=>{
        getAgents();
    },[getAgents])
    console.log("Agents", agents)
    if(isLoading){
       return <Loading/>
    }
    return(
        <div style={{direction:'rtl'}}>
        <Container fixed>
            <Typography sx={{marginTop:'40px' , marginBottom:'40px'}} variant="h4" component="div">
                الشركات العقارية
            </Typography>
            <Divider sx={{marginBottom:'10px'}}/>
        <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
        {agents && agents?.map((agent) => (
        <AgentCard key={agent._id} name={agent.name} description={agent.description} image={agent.avatar} location={agent.location}/>
        ))    
        }
        </Grid>
        </Container>
        </div>
    )
}