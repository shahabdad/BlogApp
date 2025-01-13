// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// // import {styled} from "@emotion/styled"
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import Avatar from '@mui/material/Avatar';
// import IconButton, { IconButtonProps } from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';

// import MoreVertIcon from '@mui/icons-material/MoreVert';



// export default function Blogcard( title,description,image,username) {
 

//   return (
//     <Card sx={{ width: '40%', margin :'auto',mt:2, padding:2 ,boxShadow :  '5px 5px 10px #ccc',":hover":{
//       boxShadow :'10px 10px 20px #ccc '
//     } }}>
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             {username}
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title="Shrimp and Chorizo Paella"
//         subheader="September 14, 2016"
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image={image}
//         alt="Paella dish"
//       />
//       <CardContent>
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           This impressive paella is a perfect party dish and a fun meal to cook
//           together with your guests. Add 1 cup of frozen peas along with the mussels,
//           if you like.  
//         {description}
//         </Typography> 
//       </CardContent>
 

//     </Card>
//   );
// }
import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
// import EditIcon from '@mui/icons-material/Edit';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Blogcard = ({ title, description, image, username,time ,id,isUser}) => {
  const navigate = useNavigate()
  const handleEdit  =() =>{
    navigate(`/blog-details/${id}`);
  }
  return (
    <Card
      sx={{
        width: '40%',
        margin: '20px auto',
        padding: 2,
        boxShadow: '5px 5px 10px #ccc',
        ":hover": {
          boxShadow: '10px 10px 20px #aaa',
        },
      }}
    >
    {isUser && (

      <Box display={'flex'}>
        
<IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}>
  < ModeEditIcon/>
</IconButton>
<IconButton>
  <DeleteIcon/>
</IconButton>
      </Box>

    ) }
      <Card
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username ? username[0].toUpperCase() : '?'}
          </Avatar>
        } 
      
        title={username}
        subheader={time}
      />
      <CardMedia component="img" height="194" image={image} alt={title} />
      <CardContent>
        <Typography variant='h6' color='text.sencondary'> 
        Title :  {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
       Description:{description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Blogcard;
