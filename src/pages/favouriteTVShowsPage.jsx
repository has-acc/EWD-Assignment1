import React from "react";
import PageTemplate from "../components/templateTVShowListPage";

const FavouriteTVShowsPage = (props) => {
    const toDo = () => true;
    // Get tv shows from local storage.
    const tvShows = JSON.parse(localStorage.getItem("tvFavourites"));

    return (
        <PageTemplate
            title="Favourite TV Shows"
            tvShows={tvShows}
            selectTVFavourite={toDo}
        />
    );
};

export default FavouriteTVShowsPage;
