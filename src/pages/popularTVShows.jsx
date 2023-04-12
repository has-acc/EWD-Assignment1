import React, { useState, useEffect, updateState } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getPopularTVShows } from "../api/tmdb-api";

const PopularTVShows = (props) => {
    const title = props.type === "tvshows" ? "TV Shows" : props.type
    const [movies, setMovies] = useState([]);
    const [tvShows, setTVShows] = useState([]);

    const favourites = movies.filter(m => m.favourite)
    localStorage.setItem('favourites', JSON.stringify(favourites))

    const addToFavourites = (movieId) => {
        const updatedMovies = movies.map((m) =>
            m.id === movieId ? { ...m, favourite: true } : m
        );
        setMovies(updatedMovies);
    };

    useEffect(() => {
        getPopularTVShows().then(movies => {
            setTVShows(movies);
        });
    }, []);

    return (
        <PageTemplate
            title={"Popular TV Shows"}
            movies={movies}
            tvShows={tvShows}
            selectFavourite={addToFavourites}
            props={props}
        />
    );
};
export default PopularTVShows;
