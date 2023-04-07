import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import HomePage2 from "./pages/homePage2";
import MoviePage from "./pages/movieDetailsPage";
import TVShowPage from "./pages/tvshowDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import FavouriteTVShowsPage from "./pages/favouriteTVShowsPage";
import PersonPage from "./pages/personDetailsPage";

const App = () => {
    return (
        <BrowserRouter>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/movies/">Movies</Link>
                </li>
                <li>
                    <Link to="/tvshows/">TV Shows</Link>
                </li>
                <li>
                    <Link to="/movies/movieFavourites">Movie Favourites</Link>
                </li>
                <li>
                    <Link to="/tvshows/tvFavourites">TV Favourites</Link>
                </li>
            </ul>
            <Routes>
                <Route path="/movies/movieFavourites" element={<FavouriteMoviesPage />} />
                <Route path="/tvshows/tvFavourites" element={<FavouriteTVShowsPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/tvshows/:id" element={<TVShowPage />} />
                <Route path="/movies/" element={<HomePage />} />
                <Route path="/tvshows/" element={<HomePage2 />} />
                <Route path="/person/:id" element={<PersonPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
