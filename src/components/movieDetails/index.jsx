import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import { getMovieCredits, getSimilarMovies } from "../../api/tmdb-api";

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
        alignItems: "center"},

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
    const movie = props.movie
    const [movieCredits, setMovieCredits] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);

     useEffect(() => {
         getMovieCredits(movie.id).then(movieCredits => {
             movieCredits.map(movieCredit => {
                 if (movieCredit.profile_path === null) {
                    movieCredit.profile_path="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                 } else {
                    movieCredit.profile_path='https://www.themoviedb.org/t/p/w300_and_h300_face/' + movieCredit.profile_path
                 }
             }) 
            setMovieCredits(movieCredits);
        });
     }, []);
    
    useEffect(() => {
        getSimilarMovies(movie.id).then(similarMovies => {
            similarMovies.map(similarMovie => {
                similarMovie.backdrop_path='https://www.themoviedb.org/t/p/w300_and_h300_face/' + similarMovie.backdrop_path
            })
            setSimilarMovies(similarMovies);
        });
    }, []);
    
    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="span">
                {movie.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
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
                <Chip label={`Released: ${movie.release_date}`} />
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Production Countries" sx={styles.chipLabel} color="primary" />
                </li>
                {movie.production_countries.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Typography variant="h5" component="h3">
                Cast
            </Typography>

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
            <p></p>
            <Typography variant="h5" component="h3">
                Similar Movies                 
            </Typography>
            <Typography variant="h6" component="span">
                <Slider {...settings}>
                    {similarMovies.slice(0,4).map(
                        similarMovie => (
                            <a href={"/movies/" + similarMovie.id} key={similarMovie.id}>

                                <Card sx={styles.card}>
                                <div>
                                    <><img src={similarMovie.backdrop_path} /><br></br></>
                                    Title: {similarMovie.title}<br></br>
                                </div>
                            </Card>
                        </a>
                        ))}
                </Slider>
            </Typography>
        </>
    );
};
export default MovieDetails;
