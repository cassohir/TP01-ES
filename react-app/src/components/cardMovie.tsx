import { useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface Props {
    titulo: string;
    imagem: string;
    id: string;
    data: string;
    descricao: string;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const {...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MovieCard(props: Props) {
  const [expanded, setExpanded] = useState(false);

  const [cardWidth, setCardWidth] = useState<number>(250);

  const handleExpandClick = () => {
    if (!expanded) {
      setCardWidth(400);
    } else {
      setCardWidth(250);
    }
    setExpanded(!expanded);
    
  };

  return (
    <Card sx={{ width: cardWidth }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img key={props.id} width={50} src={`https://image.tmdb.org/t/p/original/${props.imagem}`} alt={props.titulo}></img>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.titulo}
      />
      <CardMedia
        component="img"
        height="200"
        image={`https://image.tmdb.org/t/p/original/${props.imagem}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Filme de {props.data}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Sinopse:</Typography>
          <Typography paragraph>
            {props.descricao}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}