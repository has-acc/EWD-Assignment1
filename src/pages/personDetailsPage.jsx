import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PersonHeader from "../components/headerPerson";
import PersonDetails from "../components/personDetails";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getPerson, getPersonImages } from "../api/tmdb-api";

const styles = {
    imageListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
};

const PersonPage = (props) => {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        getPerson(id).then((person) => {
            setPerson(person);
        });
    }, [id]);

    useEffect(() => {
        getPersonImages(id).then((images) => {
            setImages(images);
        });
    }, []);

    return (
        <>
            {person ? (
                <>
                    <PersonHeader person={person} />
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
                            <PersonDetails person={person} />
                        </Grid>
                    </Grid>
                </>
            ) : (
                <h2>Waiting for API data</h2>
            )}
        </>
    );
};

export default PersonPage;
