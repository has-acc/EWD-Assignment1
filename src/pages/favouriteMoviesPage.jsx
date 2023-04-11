import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useAuth } from "../contexts/AuthProvider";

const FavouriteMoviesPage = (props) => {
    const { user } = useAuth();
    const toDo = () => true;
    console.log("fav " + props.type)
    console.log("You are logged in and your email address is " + user.email)
    // Get movies from local storage.
    const movies = JSON.parse(localStorage.getItem("favourites"));
    const tvShows = JSON.parse(localStorage.getItem("favourites"));

    return (
        <PageTemplate
            title={"Favourite " + props.type}
            movies={movies}
            tvShows={tvShows}
            selectFavourite={toDo}
            props={props}
        />
    );
};

export default FavouriteMoviesPage;
