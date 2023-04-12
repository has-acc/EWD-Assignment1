import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieList from "../movieList";

const styles = {
    root: {
        padding: "20px",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 2,
        right: 2,
    },
};

function MovieListPageTemplate({ movies, tvShows, title, selectFavourite, props }) {
    const [titleFilter, setTitleFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const genreId = Number(genreFilter);
    let displayedMovies;
    if (props.type === "movies") {
        displayedMovies = movies
            .filter((m) => {
                return m.title.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
            })
            .filter((m) => {
                return genreId > 0 ? m.genre_ids.includes(genreId) : true;
            });
    } else if (props.type === "tvshows") {
        displayedMovies = tvShows
            .filter((m) => {
                return m.name.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
            })
            .filter((m) => {
                return genreId > 0 ? m.genre_ids.includes(genreId) : true;
            });
    }

    const handleChange = (type, value) => {
        if (type === "title") setTitleFilter(value);
        else if (type === "name") setTitleFilter(value);
        else setGenreFilter(value);
    };

    return (
        <>
            <Grid container sx={styles.root}>
                <Grid item xs={12}>
                    <Header title={title}
                        type={props.type} />
                </Grid>
                <Grid item container spacing={5}>
                    <MovieList
                        movies={displayedMovies}
                        selectFavourite={selectFavourite}
                        type={props.type}
                    />
                </Grid>
            </Grid>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
                type={props.type}
            >
                Filter
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}

            >
                <FilterCard
                    onUserInput={handleChange}
                    titleFilter={titleFilter}
                    genreFilter={genreFilter}
                    type={props.type}
                />
            </Drawer>
        </>
    );
}
export default MovieListPageTemplate;
