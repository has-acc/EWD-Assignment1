import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { supabase } from "../../supabase";
import { useAuth } from "../../contexts/AuthProvider";

const styles = {
    card: { maxWidth: 345 },
    media: { height: 500 },
    avatar: {
        backgroundColor: "rgb(255, 0, 0)",
    },
};

export default function MovieCard(props) {
    console.log("card " + props.type)
    const movie = props.movie;
    const { user } = useAuth();

    const handleAddToFavourite = async (e) => {
        //e.preventDefault();
        if (props.type === "movies") {
            const { error } = await supabase
                .from("movies")
                .upsert([{ id: movie.id, title: movie.title, poster_path: movie.poster_path, release_date: movie.release_date, vote_average: movie.vote_average, genre: movie.genre, user_id: user.id }]);
        } else if (props.type === "tvshows") {
            const { error } = await supabase
                .from("tvshows")
                .upsert([{ id: movie.id, name: movie.name, poster_path: movie.poster_path, first_air_date: movie.first_air_date, vote_average: movie.vote_average, genre: movie.genre, user_id: user.id }]);

        }
    };

    return (
        <Card sx={styles.card}>
            <CardHeader
                sx={styles.header}
                avatar={
                    movie.favourite ? (
                        <Avatar sx={styles.avatar}>
                            <FavoriteIcon />
                        </Avatar>
                    ) : null
                }
                title={
                    <Typography variant="h5" component="span">
                        {props.type === "movies" ? movie.title : movie.name}{" "}
                    </Typography>
                }
            />
            <CardMedia
                sx={styles.media}
                image={
                    movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : img
                }
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="span">
                            <CalendarIcon fontSize="small" />
                            {props.type === "movies" ? movie.release_date : movie.first_air_date}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="span">
                            <StarRateIcon fontSize="small" />
                            {"  "} {movie.vote_average}{" "}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleAddToFavourite}>
                    <FavoriteIcon color="primary" fontSize="large" />
                </IconButton>
                <Link to={`/${props.type}/${movie.id}`}>
                    <Button variant="outlined" size="medium" color="primary">
                        More Info ...
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
