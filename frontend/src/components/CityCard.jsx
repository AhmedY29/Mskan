import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CityCard({title ,count , image}) {
  return (

    <>
    <Card sx={{ maxWidth: 245 , width:'100%' }}>
      <CardMedia
        sx={{ height: 150 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {count} عقار
        </Typography>
      </CardContent>
    </Card>
    </>
  );
}