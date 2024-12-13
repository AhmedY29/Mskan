import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import Grid from "@mui/material/Grid2";
import { Link } from 'react-router-dom';

export default function AgentCard({name , location , image}) {
  return (

    <>
        <Grid
          size={{ xs: 2, sm: 4, md: 4 }}
                >
    <Card sx={{ maxWidth: 245 , width:'100%' }}>
    <Link style={{textDecoration:'none', color:'black'}}  to={`/account/agent/${name}`}>
      <CardMedia
        sx={{ height: 150 }}
        image={image}
        title={name}
      />
      <CardContent>
        <Typography sx={{textAlign:'center'}} gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{textAlign:'center'}} variant="p" component="div">
           مناطق العمل
        </Typography>
        <Divider/>
        <Typography  variant="body2" sx={{ color: 'text.secondary', textAlign:'center' }}>
            {location.map(city => `${city} ,`)}
        </Typography>
      </CardContent>
      </Link>
    </Card>
    </Grid>
    </>
  );
}