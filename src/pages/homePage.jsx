import React, { useState, useEffect, updateState } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getMovies, getTVShows } from "../api/tmdb-api";

const HomePage = (props) => {
    console.log("Props " + props.type)
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
        getMovies().then(movies => {
            setMovies(movies);
        });
    }, []);

    useEffect(() => {
        getTVShows().then(tvShows => {
            setTVShows(tvShows);
        });
    }, []);


    return (
        <PageTemplate
            title={ props.type === "tvshows" ? "Discover TV Shows" :"Discover " + props.type}
            movies={movies}
            tvShows={tvShows}
            selectFavourite={addToFavourites}
            props={props}
        />
    );
};
export default HomePage;
