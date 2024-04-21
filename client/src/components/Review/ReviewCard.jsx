import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Rating } from '@mui/material';
import OptionsPopover from '../OptionsPopover';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
// import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({data,review,setOpenSnack}) {
  const [expanded, setExpanded] = React.useState(false);
  const params = useParams()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleEdit = () => {
    // Handle edit functionality
    try{
      const res = await axios.delete(`http://localhost:3001/api/reviews/editReview/${params.id}/${review._id}`);
      console.log(res.data);
      setOpenSnack(true)


    }catch(err){
      console.log(err)
    }

};

const handleDelete = async() => {
    // Handle delete functionality
    try{
      const res = await axios.delete(`http://localhost:3001/api/reviews/deleteReview/${params.id}/${review._id}`);
      console.log(res.data);
      setOpenSnack(true)


    }catch(err){
      console.log(err)
    }
};

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar 
          src={`https://ui-avatars.com/api/?name=${review?.ReviewerName}&background=random`}
          >
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
            <OptionsPopover onEdit={handleEdit} onDelete={handleDelete} />
          </IconButton>
        }
        title={review?.ReviewerName}
        subheader={review?.Date.slice(0,10)}
      />
      {/* <CardContent> */}
      <div className='mx-5'>
      <Rating name="read-only" value={review.Rating} precision={0.5} readOnly/>
        <Typography variant="body2" color="text.secondary" className='px-1 pb-2'>
           {review?.Comment}
        </Typography>
      </div>
      {/* </CardContent> */}
    </Card>
  );
}