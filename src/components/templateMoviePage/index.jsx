import React, { useState, useEffect } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages, getTVShowImages, getPersonImages } from "../../api/tmdb-api";

const styles = {
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridList: {
        width: 450,
        height: '100vh',
    },
};

const TemplateMoviePage = ({ movie, children, props }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (props.type === "movies") {
            getMovieImages(movie.id).then((images) => {
                setImages(images);
            });
        } else if (props.type === "tvshows") {
            getTVShowImages(movie.id).then((images) => {
                setImages(images);
            });
        } else if (props.type === "actor") {
            getPersonImages(movie.id).then((images) => {
                setImages(images);
            });
        }
    }, []);

    return (
        <>
            <MovieHeader movie={movie} type={props.type} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <div sx={styles.gridListRoot}>
                        <ImageList cols={1}>
                            {images.map((image) => (
                                <ImageListItem
                                    key={image.file_path}
                                    sx={styles.gridListTile}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={image.poster_path}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>

                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateMoviePage;
