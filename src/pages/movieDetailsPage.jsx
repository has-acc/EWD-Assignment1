import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieHeader from "../components/headerMovie/";
import MovieDetails from "../components/movieDetails/";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovie, getMovieImages, getTVShow, getTVShowImages, getPerson, getPersonImages } from "../api/tmdb-api";

const styles = {
    imageListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
};

const MoviePage = (props) => {
    console.log("Movie page " + props.type)
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [images, setImages] = useState([]);
    const [person, setPerson] = useState(null);

    useEffect(() => {
        if (props.type === "movies") {
            getMovie(id).then((movie) => {
                setMovie(movie);
            });
            getMovieImages(id).then((images) => {
                setImages(images);
            });
        } else if (props.type==="tvshows"){
            getTVShow(id).then((movie) => {
                setMovie(movie);
            });
            getTVShowImages(id).then((images) => {
                setImages(images);
            });
        } else {
            getPerson(id).then((person) => {
                setMovie(person);
            });
            getPersonImages(id).then((images) => {
                setImages(images);
        });
        }
    }, [id]);


    return (
        <>
            {movie ? (
                <>
                    <MovieHeader movie={movie} type={props.type} />
                    <Grid container spacing={5} style={{ padding: "15px" }}>
                        <Grid item xs={3}>
                            <div sx={styles.imageListRoot}>
                                <ImageList cols={1}>
                                    {images.map((image) => (
                                        <ImageListItem
                                            key={image.file_path}
                                            sx={styles.gridListTile}
                                            cols={1}
                                        >
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                                alt={image.file_path}
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </div>
                        </Grid>
                        <Grid item xs={9}>
                            <MovieDetails movie={movie} type={props.type} />
                        </Grid>
                    </Grid>
                </>
            ) : (
                <h2>Waiting for API data</h2>
            )}
        </>
    );
};

export default MoviePage;
