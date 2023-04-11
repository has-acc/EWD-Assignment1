import React from "react";
import PageTemplate from "../components/templateMovieListPage";

const FavouriteMoviesPage = (props) => {
    const toDo = () => true;
    console.log("fav " + props.type)
    // Get movies from local storage.
    const movies = JSON.parse(localStorage.getItem("favourites"));
    const tvShows = JSON.parse(localStorage.getItem("favourites"));

    return (
        <PageTemplate
            title="Favourite Movies"
            movies={movies}
            tvShows={tvShows}
            selectFavourite={toDo}
            props={props}
        />
    );
};

export default FavouriteMoviesPage;
