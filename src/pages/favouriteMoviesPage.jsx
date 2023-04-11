import React from "react";
import PageTemplate from "../components/templateMovieListPage";

const FavouriteMoviesPage = (props) => {
    const toDo = () => true;
    console.log("fav" + props.type)
    // Get movies from local storage.
    const movies = JSON.parse(localStorage.getItem("favourites"));

    return (
        <PageTemplate
            title="Favourite Movies"
            movies={movies}
            selectFavourite={toDo}
            type={props.type}
            tvShows=""
        />
    );
};

export default FavouriteMoviesPage;
