import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getPerson, getTVShow } from "../api/tmdb-api";

const MovieDetailsPage = (props) => {
    console.log("Movie details page " + props.type)
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        if (props.type === "movies") {
            getMovie(id).then((movie) => {
                setMovie(movie);
            });
        } else if (props.type === "tvshows") {
            getTVShow(id).then((movie) => {
                setMovie(movie);
            });
        } else if (props.type === "actor") {
            getPerson(id).then((movie) => {
                setMovie(movie);
            });
        }
    }, [id]);

    return (
        <>
            {movie ? (
                <>
                    <PageTemplate movie={movie} props={props}>
                        <MovieDetails movie={movie} type={props.type} />
                    </PageTemplate>
                </>
            ) : (
                <p>Waiting for movie details</p>
            )}
        </>
    );
};

export default MovieDetailsPage;
