import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TVShowHeader from "../components/headerTVShow";
import TVShowDetails from "../components/tvShowDetails/";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getTVShow, getTVShowImages } from "../api/tmdb-api";

const styles = {
    imageListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
};

const TVShowPage = (props) => {
    const { id } = useParams();
    const [tvShow, setTVShow] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        getTVShow(id).then((tvShow) => {
            setTVShow(tvShow);
        });
    }, [id]);

    useEffect(() => {
        getTVShowImages(id).then((images) => {
            setImages(images);
        });
    }, []);


    return (
        <>
            {tvShow ? (
                <>
                    <TVShowHeader tvShow={tvShow} />
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
                            <TVShowDetails tvShow={tvShow} />
                        </Grid>
                    </Grid>
                </>
            ) : (
                <h2>Waiting for API data</h2>
            )}
        </>
    );
};

export default TVShowPage;
