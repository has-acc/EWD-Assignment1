import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateTVShowListPage'
import { getTVShows } from "../api/tmdb-api";

const HomePage = (props) => {
    const [tvShows, settvShows] = useState([]);
    const tvFavourites = tvShows.filter(tv => tv.tvFavourite)
    localStorage.setItem('tvFavourites', JSON.stringify(tvFavourites))

    const addToTVFavourites = (tvShowId) => {
        const updatedTVShows = tvShows.map((tv) =>
            tv.id === tvShowId ? { ...tv, tvFavourite: true } : m
        );
        settvShows(updatedTVShows);
    };

    useEffect(() => {
        getTVShows().then(tvShows => {
            settvShows(tvShows);
        });
    }, []);

    return (
        <PageTemplate
            title='Discover TVShows'
            tvShows={tvShows}
            selectTVFavourite={addToTVFavourites}
        />
    );
};
export default HomePage;
