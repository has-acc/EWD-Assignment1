import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        padding: 1.5,
    },
    avatar: {
        backgroundColor: "rgb(255, 0, 0)",
    },
};

const MovieHeader = (props) => {
    console.log("movie " + props.type)
    const movie = props.movie;
    const tvShow = props.tvShows;
    const json = localStorage.getItem("favourites");

    const movies = JSON.parse(json).filter(n => {
        return n.title === movie.title;
    });

    const tvShows = JSON.parse(json).filter(n => {
        return n.name === tvShow.name;
    })

    let favorite;
    if (movies.length !== 0 && movies[0].favourite === true) {
        favorite = <Avatar sx={styles.avatar}><FavoriteIcon /></Avatar>;
    }

    return (
        <Paper component="div" sx={styles.root}>
            <IconButton aria-label="go back">
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>
            {favorite}
            <Typography variant="h4" component="h3">
                {props.type === "movies" ? movie.title : movie.name}{"   "}
                <a href={movie.homepage}>
                    <HomeIcon color="primary" fontSize="='large" />
                </a>
                <br />
                <span>{props.type === "movies" ? movie.tagline : ""} </span>
            </Typography>
            <IconButton aria-label="go forward">
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default MovieHeader;
