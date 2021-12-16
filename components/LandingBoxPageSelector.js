import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { usePageState } from "../lib/pageState";
import { Router } from "next/router";

const LandingBoxPageSelector = ({ prop, name, paragraph }) => {
  const { toggleWeb, togglePhoto } = usePageState();

  async function selectPage(prop) {
    if (prop === "web") {
      await toggleWeb();
      return Router.push("/web");
    } else if (prop === "photo") {
      await togglePhoto();
      return Router.push("/photography");
    }
  }

  return (
    <Card
      sx={{
        maxWidth: "345px",
        marginTop: "35px",
        marginBottom: "35px",
      }}
    >
      <CardActionArea onClick={() => selectPage(prop)}>
        <CardMedia
          component='img'
          height='140'
          image='/static/images/cards/contemplative-reptile.jpg'
          alt='image alt tag'
        />
        <CardContent
          sx={{
            backgroundColor: "gray",
          }}
        >
          <Typography gutterBottom variant='h5' component='div' color='white'>
            {name}
          </Typography>
          <Typography variant='body2' color='white'>
            {paragraph}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LandingBoxPageSelector;
