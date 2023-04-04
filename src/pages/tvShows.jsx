import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateTVShowListPage'
import { getTVShows } from "../api/tmdb-api";

const HomePage = (props) => {
    const [tvShows, setTVShows] = useState([]);
    const tvFavourites = tvShows.filter(tv => tv.tvFavourite)
    localStorage.setItem('tvFavourites', JSON.stringify(tvFavourites))

    const addToFavourites = (tvShowId) => {
        const updatedTVShows = tvShows.map((tv) =>
            tv.id === tvShowId ? { ...tv, tvFavourite: true } : tv
        );
        setTVShows(updatedTVShows);
    };

    useEffect(() => {
        getTVShows().then(tvShows => {
            setTVShows(tvShows);
        });
    }, []);

    return (
        <PageTemplate
            title='Discover TVShows'
            tvShows={tvShows}
            selectTVFavourite={addToFavourites}
        />
    );
};
export default HomePage;
