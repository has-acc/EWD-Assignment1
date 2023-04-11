import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import { getMovieCredits, getSimilarMovies, getTVShowCredits, getSimilarTVShows } from "../../api/tmdb-api";

import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from '../movieReviews'

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
    card: {
        maxWidth: 300,
        alignItems: "center"
    },
    fab: {
        position: "fixed",
        top: 50,
        right: 2,
    },
};


var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const MovieDetails = (props) => {
    console.log("details " + props.type)
    const movie = props.movie
    const [movieCredits, setMovieCredits] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (props.type === "movies") {
            getMovieCredits(movie.id).then(movieCredits => {
                movieCredits.map(movieCredit => {
                    if (movieCredit.profile_path === null) {
                        movieCredit.profile_path = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                    } else {
                        movieCredit.profile_path = 'https://www.themoviedb.org/t/p/w300_and_h300_face/' + movieCredit.profile_path
                    }
                })
                setMovieCredits(movieCredits);
            });
            getSimilarMovies(movie.id).then(similarMovies => {
                similarMovies.map(similarMovie => {
                    if (similarMovie.backdrop_path === null) {
                        console.log(similarMovie.backdrop_path)
                        similarMovie.backdrop_path = "/i-t32yvKixg10fG.png"
                    } else {
                        similarMovie.backdrop_path = 'https://www.themoviedb.org/t/p/w300_and_h300_face/' + similarMovie.backdrop_path
                    }
                })
                setSimilarMovies(similarMovies);
            });
        } else if (props.type === "tvshows") {
            getTVShowCredits(movie.id).then(movieCredits => {
                movieCredits.map(movieCredit => {
                    if (movieCredit.profile_path === null) {
                        movieCredit.profile_path = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                    } else {
                        movieCredit.profile_path = 'https://www.themoviedb.org/t/p/w300_and_h300_face/' + movieCredit.profile_path
                    }
                })
                setMovieCredits(movieCredits);
            });
            getSimilarTVShows(movie.id).then(similarMovies => {
                similarMovies.map(similarMovie => {
                    console.log(similarMovie.name)
                    if (similarMovie.backdrop_path === null) {
                        similarMovie.backdrop_path = "/i-t32yvKixg10fG.png"
                    } else {
                        similarMovie.backdrop_path = 'https://www.themoviedb.org/t/p/w300_and_h300_face/' + similarMovie.backdrop_path
                    }
                })
                setSimilarMovies(similarMovies);
            });
        } else {

        }
    }, []);

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="span">
                {props.type === "movies" || props.type === "tvshows" ? movie.overview : movie.biography === "" ? "No Biography found " : movie.biography}
            </Typography>
            {props.type === "movies" || props.type === "tvshows" ?
                <Paper component="ul" sx={styles.chipSet}>
                    <li>
                        <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                    </li>
                    {props.type === "movies" || props.type === "tvshows" ? movie.genres.map((g) => (
                        <li key={g.name}>
                            <Chip label={g.name} />
                        </li>
                    )) : ""}
                </Paper>
                : ""}
            {props.type === "movies" &&
                <Paper component="ul" sx={styles.chipSet}>
                    <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
                    <Chip
                        icon={<MonetizationIcon />}
                        label={`${movie.revenue.toLocaleString()}`}
                    />
                    <Chip
                        icon={<StarRate />}
                        label={`${movie.vote_average} (${movie.vote_count}`}
                    />
                    <Chip label={props.type === "movies" ? `Released: ${movie.release_date}` : `First Air Date: ${movie.first_air_date}`} />
                </Paper>
            }
            {props.type === "movies" || props.type === "tvshows" ?
                <Paper component="ul" sx={styles.chipSet}>
                    <li>
                        <Chip label="Production Countries" sx={styles.chipLabel} color="primary" />
                    </li>
                    {props.type === "movies" || props.type === "tvshows" ? movie.production_countries.map((g) => (
                        <li key={g.name}>
                            <Chip label={g.name} />
                        </li>
                    )) : ""}
                </Paper>
                : ""}
            {props.type === "movies" || props.type === "tvshows" ?
                <Typography variant="h5" component="h3">
                    Cast
                </Typography>
                : ""}
            {props.type === "movies" || props.type === "tvshows" ?
                <Typography variant="h6" component="span">
                    <Slider {...settings}>
                        {movieCredits.map(
                            movieCredit => (
                                <a href={"/person/" + movieCredit.id} key={movieCredit.id}>

                                    <Card sx={styles.card}>
                                        <div>
                                            <><img src={movieCredit.profile_path} /><br></br></>
                                            Name: {movieCredit.name}<br></br>
                                            Character: {movieCredit.character}
                                        </div>
                                    </Card>
                                </a>
                            ))}
                    </Slider>
                </Typography>
                : ""}
            <p></p>
            {props.type === "movies" || props.type === "tvshows" ?
                <Typography variant="h5" component="h3">
                    Similar {props.type === "movies" ? "Movies" : "TV Shows"}
                </Typography>
                : ""}
            {props.type === "movies" || props.type === "tvshows" ?
                <Typography variant="h6" component="span">
                    <Slider {...settings}>
                        {similarMovies.map(
                            similarMovie => (
                                <a href={"/" + props.type + "/" + similarMovie.id} key={similarMovie.id}>

                                    <Card sx={styles.card}>
                                        <div>
                                            <><img src={similarMovie.backdrop_path} /><br></br></>
                                            Title: {props.type === "movies" ? similarMovie.title : similarMovie.name}<br></br>
                                        </div>
                                    </Card>
                                </a>
                            ))}
                    </Slider>
                </Typography>
                : ""}
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <MovieReviews movie={movie} />
            </Drawer>
        </>
    );
};
export default MovieDetails;
